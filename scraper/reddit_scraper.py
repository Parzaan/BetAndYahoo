import asyncio
import httpx
from typing import List, Dict, Any

class RedditMemeScraper:
    def __init__(self):
        # A custom User-Agent is strictly required to avoid Reddit's Too Many Requests error
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 BetAndYahooScraper/1.0"
        }

    def _estimate_votes(self, score: int, upvote_ratio: float) -> tuple[int, int]:
        """
        Reddit hides exact upvotes/downvotes and only gives `score` and `upvote_ratio`.
        score = upvotes - downvotes
        upvote_ratio = upvotes / (upvotes + downvotes)
        This function estimates downvotes and upvotes from these two parameters.
        """
        if upvote_ratio == 0.5:
            return (score, 0) if score > 0 else (0, abs(score))
        
        try:
            total_votes = score / (2 * upvote_ratio - 1)
            upvotes = int(round(total_votes * upvote_ratio))
            downvotes = int(round(upvotes - score))
            return max(0, upvotes), max(0, downvotes)
        except ZeroDivisionError:
            return score, 0

    async def fetch_viral_memes(self, subreddits: List[str] = ["memes", "dankmemes"], limit: int = 50) -> List[Dict[str, Any]]:
        """
        Fetches the hottest memes from the provided list of subreddits.
        Filters out NSFW content and non-image posts.
        """
        memes = []
        seen_ids = set()

        async with httpx.AsyncClient(headers=self.headers, timeout=10.0) as client:
            for subreddit in subreddits:
                url = f"https://www.reddit.com/r/{subreddit}/hot.json?limit={limit}"
                
                try:
                    response = await client.get(url)
                    response.raise_for_status()
                    data = response.json()
                    
                    posts = data.get("data", {}).get("children", [])
                    
                    for post in posts:
                        post_data = post.get("data", {})
                        
                        post_id = post_data.get("id")
                        if not post_id or post_id in seen_ids:
                            continue
                        
                        # NSFW Filter
                        if post_data.get("over_18") is True:
                            continue
                            
                        # Image filter (only want actual memes, no text/discussions, or sketchy domains)
                        image_url = post_data.get("url", "")
                        if not image_url.endswith((".jpg", ".jpeg", ".png", ".gif")):
                            continue
                            
                        score = post_data.get("score", 0)
                        upvote_ratio = post_data.get("upvote_ratio", 1.0)
                        upvotes, downvotes = self._estimate_votes(score, upvote_ratio)

                        memes.append({
                            "id": post_id,
                            "title": post_data.get("title", "Untitled"),
                            "url": image_url,
                            "score": score,
                            "upvotes": upvotes,
                            "downvotes": downvotes,
                            "upvote_ratio": upvote_ratio,
                            "subreddit": post_data.get("subreddit", subreddit),
                            "permalink": f"https://reddit.com{post_data.get('permalink', '')}"
                        })
                        seen_ids.add(post_id)
                        
                except httpx.HTTPStatusError as e:
                    print(f"Error fetching from r/{subreddit}: HTTP {e.response.status_code}")
                except Exception as e:
                    print(f"Unexpected error fetching from r/{subreddit}: {str(e)}")

        # Sort by most viral (highest score) across all fetched subreddits
        memes.sort(key=lambda x: x["score"], reverse=True)
        return memes
