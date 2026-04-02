// Mock meme data for the prediction market

const generatePriceHistory = (basePrice, volatility, points = 24) => {
  const past = [];
  const prediction = [];
  let price = basePrice - 0.2; // simulate rising from lower
  
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.4) * volatility;
    price = Math.max(0.01, Math.min(0.99, price));
    past.push(parseFloat(price.toFixed(2)));
  }
  
  // Force exactly match current price
  past[past.length - 1] = basePrice;
  
  let predPrice = basePrice;
  for (let i = 0; i < points; i++) {
    predPrice += (Math.random() - 0.5) * volatility;
    predPrice = Math.max(0.01, Math.min(0.99, predPrice));
    prediction.push(parseFloat(predPrice.toFixed(2)));
  }
  
  return { past, prediction };
};

export const MEME_SOURCES = {
  REDDIT: { name: 'Reddit', emoji: '🟠', color: '#FF4500' },
  TWITTER: { name: 'Twitter/X', emoji: '🔵', color: '#1DA1F2' },

  INSTAGRAM: { name: 'Instagram', emoji: '📸', color: '#E1306C' },
  TIKTOK: { name: 'TikTok', emoji: '🎵', color: '#00f2ea' },
};

export const CATEGORIES = ['🔥 Trending', '🆕 New', '💀 Dead', '🏆 Resolved', '⚡ All'];

export const initialMemes = [
  {
    id: 'meme-001',
    title: 'Distracted Boyfriend Returns',
    description: 'The classic distracted boyfriend meme resurfaces with new AI twist. Will it break 100K shares this week?',
    image: 'https://i.imgflip.com/1ur9b0.jpg',
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 45230,
    totalShares: 89400,
    priceHistory: {
      past: [0.15, 0.18, 0.22, 0.28, 0.35, 0.45, 0.60, 0.75, 0.82, 0.88],
      prediction: [0.88, 0.89, 0.92, 0.95, 0.96, 0.98, 0.99, 0.98, 0.99]
    },
    category: 'trending',
    source: 'REDDIT',
    timeLeft: '2d 14h',
    createdAt: Date.now() - 86400000 * 2,
    comments: 234,
    hot: true,
    resolved: false,
    question: 'Will this meme get 100K+ shares by April 5?',
  },
  {
    id: 'meme-002',
    title: 'AI Drake Meme',
    description: 'Drake hotline bling format but with ChatGPT vs Gemini. Spreading fast on Twitter.',
    image: 'https://i.imgflip.com/30b1gx.jpg',
    yesPrice: 0.85,
    noPrice: 0.15,
    volume: 78100,
    totalShares: 156000,
    priceHistory: generatePriceHistory(0.85, 0.05),
    category: 'trending',
    source: 'TWITTER',
    timeLeft: '1d 6h',
    createdAt: Date.now() - 86400000,
    comments: 567,
    hot: true,
    resolved: false,
    question: 'Will AI Drake dominate meme charts this week?',
  },

  {
    id: 'meme-004',
    title: 'This Is Fine Dog 2.0',
    description: 'Updated "This is fine" for 2026. Everything is on fire but make it fashion.',
    image: 'https://i.imgflip.com/wx3p.jpg',
    yesPrice: 0.63,
    noPrice: 0.37,
    volume: 34500,
    totalShares: 67800,
    priceHistory: generatePriceHistory(0.63, 0.10),
    category: 'trending',
    source: 'INSTAGRAM',
    timeLeft: '3d 8h',
    createdAt: Date.now() - 86400000 * 1.5,
    comments: 345,
    hot: true,
    resolved: false,
    question: 'Will "This is Fine 2.0" get 50K+ Instagram saves?',
  },
  {
    id: 'meme-005',
    title: 'Expanding Brain: AI Edition',
    description: 'Galaxy brain meme but each level is a different AI model. Peak intellectualism.',
    image: 'https://i.imgflip.com/1jwhww.jpg',
    yesPrice: 0.31,
    noPrice: 0.69,
    volume: 12300,
    totalShares: 24000,
    priceHistory: generatePriceHistory(0.31, 0.15),
    category: 'new',
    source: 'REDDIT',
    timeLeft: '6d 12h',
    createdAt: Date.now() - 3600000 * 8,
    comments: 67,
    hot: false,
    resolved: false,
    question: 'Will Expanding Brain AI reach Reddit front page?',
  },
  {
    id: 'meme-006',
    title: 'Woman Yelling at Cat: Tax Season',
    description: 'Tax season remix of the legendary woman yelling at cat meme. Accountants everywhere relate.',
    image: 'https://i.imgflip.com/345v97.jpg',
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 29800,
    totalShares: 58000,
    priceHistory: generatePriceHistory(0.58, 0.09),
    category: 'trending',
    source: 'TWITTER',
    timeLeft: '4d 20h',
    createdAt: Date.now() - 86400000 * 2.5,
    comments: 189,
    hot: false,
    resolved: false,
    question: 'Will tax cat meme outperform original by shares?',
  },
  {
    id: 'meme-008',
    title: 'NPC Goes to Gym',
    description: 'NPC meme format applied to gym culture. "Yes I do 500 reps of exactly the same exercise."',
    image: 'https://i.imgflip.com/2/2wifvo.jpg',
    yesPrice: 0.22,
    noPrice: 0.78,
    volume: 8900,
    totalShares: 17000,
    priceHistory: generatePriceHistory(0.22, 0.18),
    category: 'dead',
    source: 'INSTAGRAM',
    timeLeft: '1d 3h',
    createdAt: Date.now() - 86400000 * 7,
    comments: 45,
    hot: false,
    resolved: false,
    question: 'Can NPC Gym make a comeback this week?',
  },
  {
    id: 'meme-009',
    title: 'Surprised Pikachu: Budget Edition',
    description: 'Government announces budget cuts. Internet responds with surprised Pikachu. Classic.',
    image: 'https://i.imgflip.com/2kbn1e.jpg',
    yesPrice: 0.67,
    noPrice: 0.33,
    volume: 41200,
    totalShares: 82000,
    priceHistory: generatePriceHistory(0.67, 0.07),
    category: 'trending',
    source: 'TWITTER',
    timeLeft: '2d 18h',
    createdAt: Date.now() - 86400000,
    comments: 278,
    hot: true,
    resolved: false,
    question: 'Will Surprised Pikachu trend on Twitter for 3+ days?',
  },
  {
    id: 'meme-010',
    title: 'Chad vs Virgin: Remote Work',
    description: 'Work from home culture clash meme. Chad remote worker vs Virgin return-to-office.',
    image: 'https://i.imgflip.com/2/2xscjb.jpg',
    yesPrice: 0.54,
    noPrice: 0.46,
    volume: 19800,
    totalShares: 38000,
    priceHistory: generatePriceHistory(0.54, 0.11),
    category: 'new',
    source: 'REDDIT',
    timeLeft: '5d 6h',
    createdAt: Date.now() - 3600000 * 12,
    comments: 134,
    hot: false,
    resolved: false,
    question: 'Will Remote Work Chad get 25K+ upvotes on Reddit?',
  },
  {
    id: 'meme-011',
    title: 'Stonks Man Rises Again',
    description: 'Stonks meme returns as markets hit all-time highs. The original financial meme lord.',
    image: 'https://i.imgflip.com/2/3lhq0f.jpg',
    yesPrice: 0.78,
    noPrice: 0.22,
    volume: 56700,
    totalShares: 112000,
    priceHistory: generatePriceHistory(0.78, 0.06),
    category: 'trending',
    source: 'REDDIT',
    timeLeft: '1d 15h',
    createdAt: Date.now() - 86400000 * 1.2,
    comments: 456,
    hot: true,
    resolved: false,
    question: 'Will Stonks Man return to #1 trending?',
  },
  {
    id: 'meme-012',
    title: 'SpongeBob Mocking: AI Art',
    description: 'SpOnGeBoB mOcKiNg format used to roast AI-generated art. Controversial and viral.',
    image: 'https://i.imgflip.com/1otk96.jpg',
    yesPrice: 0.43,
    noPrice: 0.57,
    volume: 15600,
    totalShares: 30000,
    priceHistory: {
      past: [0.80, 0.75, 0.68, 0.62, 0.55, 0.48, 0.42, 0.38, 0.35, 0.32],
      prediction: [0.32, 0.30, 0.28, 0.26, 0.25, 0.22, 0.21, 0.20, 0.19]
    },
    category: 'new',
    source: 'TWITTER',
    timeLeft: '4d 10h',
    createdAt: Date.now() - 3600000 * 6,
    comments: 89,
    hot: false,
    resolved: false,
    question: 'Will SpongeBob Mocking AI Art go multi-platform viral?',
  },
];

export const mockEvents = [
  {
    id: 'event-001',
    title: '🚀 SpaceX Starship Launch Attempt',
    description: 'SpaceX attempting another Starship orbital test. Internet is ready with memes.',
    category: 'Tech',
    timestamp: Date.now() - 3600000 * 2,
    active: true,
    detectedMemes: [
      { title: 'Elon Watching Rocket Go Boom', source: 'TWITTER', virality: 0.82, inMarket: false },
      { title: 'To The Moon Literally', source: 'REDDIT', virality: 0.65, inMarket: true },

    ],
  },
  {
    id: 'event-002',
    title: '🏈 Super Bowl Halftime Reactions',
    description: 'The internet reacts to the Super Bowl halftime show with a flood of memes.',
    category: 'Sports',
    timestamp: Date.now() - 3600000 * 5,
    active: true,
    detectedMemes: [
      { title: 'Halftime Show Dance Challenge', source: 'TIKTOK', virality: 0.91, inMarket: true },
      { title: 'When The Commercials Are Better', source: 'TWITTER', virality: 0.73, inMarket: false },
      { title: 'Football Is Just Ads', source: 'REDDIT', virality: 0.58, inMarket: false },
    ],
  },
  {
    id: 'event-003',
    title: '💰 Bitcoin Hits New ATH',
    description: 'Bitcoin breaks another all-time high. Crypto Twitter is going absolutely nuclear.',
    category: 'Crypto',
    timestamp: Date.now() - 3600000,
    active: true,
    detectedMemes: [
      { title: 'WAGMI Chad Energy', source: 'REDDIT', virality: 0.88, inMarket: true },
      { title: 'My Portfolio After HODL', source: 'REDDIT', virality: 0.76, inMarket: false },
      { title: 'Banks Are Shaking', source: 'TWITTER', virality: 0.69, inMarket: false },
    ],
  },
  {
    id: 'event-004',
    title: '🎬 Oscar Nominations Announced',
    description: 'Controversial Oscar nominations drop. Film Twitter and meme makers activated.',
    category: 'Pop Culture',
    timestamp: Date.now() - 3600000 * 8,
    active: false,
    detectedMemes: [
      { title: 'Oscar Bait Starter Pack', source: 'TWITTER', virality: 0.71, inMarket: true },
      { title: 'Snubbed Actor Crying Jordan', source: 'INSTAGRAM', virality: 0.64, inMarket: false },
    ],
  },
  {
    id: 'event-005',
    title: '🗳️ Election Season Memes',
    description: 'Primary debates are generating meme content at an unprecedented rate.',
    category: 'Politics',
    timestamp: Date.now() - 3600000 * 4,
    active: true,
    detectedMemes: [
      { title: 'Debate Face Reaction', source: 'TWITTER', virality: 0.85, inMarket: true },
      { title: 'I Voted Sticker But Make It Meme', source: 'INSTAGRAM', virality: 0.52, inMarket: false },

      { title: 'Campaign Poster Parody', source: 'REDDIT', virality: 0.61, inMarket: false },
    ],
  },
];

export const mockLeaderboard = [
  { rank: 1, username: 'MemeKing420aenfjbesjfbcsjfnsdnbfvndsfnsh', balance: 52340, profit: 42340, wins: 89},
  { rank: 2, username: 'DiamondHands', balance: 41200, profit: 31200, wins: 76},
  { rank: 3, username: 'PepeTrader', balance: 38900, profit: 28900, wins: 71},
  { rank: 4, username: 'StonksOnly', balance: 35600, profit: 25600, wins: 65},
  { rank: 5, username: 'MoonShot', balance: 32100, profit: 22100, wins: 58},
  { rank: 6, username: 'ViralVince', balance: 28700, profit: 18700, wins: 52},
  { rank: 7, username: 'DankInvestor', balance: 25400, profit: 15400, wins: 47},
  { rank: 8, username: 'MemeLordX', balance: 22800, profit: 12800, wins: 43},
  { rank: 9, username: 'ChartChaser', balance: 19500, profit: 9500, wins: 38},
  { rank: 10, username: 'Normie2Pro', balance: 16200, profit: 6200, wins: 31},
];

export const achievements = [
  { id: 'first-bet', title: 'First Blood', desc: 'Place your first bet', emoji: '🎯', threshold: 1 },
  { id: 'ten-bets', title: 'Getting Started', desc: 'Place 10 bets', emoji: '🎯', threshold: 10 },
  { id: 'big-win', title: 'Big Winner', desc: 'Win 1,000+ MemeBucks in a single bet', emoji: '🏆', threshold: 1000 },
  { id: 'whale', title: 'Whale Alert', desc: 'Have 50,000+ MemeBucks', emoji: '🐋', threshold: 50000 },
  { id: 'meme-lord', title: 'Meme Lord', desc: 'Win 25 bets', emoji: '👑', threshold: 25 },
  { id: 'streak', title: 'On Fire', desc: 'Win 5 bets in a row', emoji: '🔥', threshold: 5 },
  { id: 'diversified', title: 'Diversified', desc: 'Bet on 10 different memes', emoji: '🎲', threshold: 10 },
  { id: 'early-bird', title: 'Early Bird', desc: 'Bet on a meme within 1 hour of creation', emoji: '🐦', threshold: 1 },
];
