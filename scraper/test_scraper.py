import asyncio
import json
from reddit_scraper import RedditMemeScraper

async def main():
    print("Initializing Reddit Scraper...")
    scraper = RedditMemeScraper()
    
    print("Fetching memes from r/memes and r/hmm...")
    memes = await scraper.fetch_viral_memes(subreddits=["memes", "hmm"], limit=10)
    
    print(f"Found {len(memes)} safe image memes.")
    
    if memes:
        print("\nTop 3 Viral Memes:")
        for i, meme in enumerate(memes[:3], 1):
            print(f"{i}. [{meme['subreddit']}] {meme['title']}")
            print(f"   URL: {meme['url']}")
            print(f"   Score: {meme['score']} (Upvotes: {meme['upvotes']} | Downvotes: {meme['downvotes']} | Ratio: {meme['upvote_ratio']})")
    else:
        print("No memes found. This could be due to rate limiting or networking errors.")

if __name__ == "__main__":
    asyncio.run(main())
