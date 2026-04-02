import { useState } from 'react';
import { motion } from 'framer-motion'; // Using framer-motion as per standard
import { mockLeaderboard } from '../lib/mockMemes';
import { useAuth } from '../context/AuthContext';
import { DollarSign, Trophy, Medal, Crown } from 'lucide-react';
import BorderGlow from "../components/ui/BorderGlow.jsx";
import "../components/ui/BorderGlow.css";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('all');

  const leaderboard = [...mockLeaderboard];
  if (user && !leaderboard.find(l => l.username === user.username)) {
    leaderboard.push({
      rank: leaderboard.length + 1,
      username: user.username,
      balance: user.balance,
      profit: user.balance - 10000,
      wins: user.wins || 0,
      isUser: true,
    });
    leaderboard.sort((a, b) => b.balance - a.balance);
    leaderboard.forEach((item, i) => { item.rank = i + 1; });
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-yellow-400 h-6 w-6" />;
    if (rank === 2) return <Medal className="text-slate-300 h-5 w-5" />;
    if (rank === 3) return <Medal className="text-amber-600 h-5 w-5" />;
    return <span className="text-market-text/40 font-mono text-sm">#{rank}</span>;
  };

  return (
    /* Added pt-20 to ensure the Crown isn't cropped at the top */
    <div className="p-8 pt-20 w-full max-w-6xl mx-auto min-h-screen bg-market-bg text-market-text rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="text-market-accent h-10 w-10" />
            <span>Hall of Fame</span>
          </h1>
          <p className="text-market-text/60 text-lg">The top predictors across the market.</p>
        </div>

        <div className="flex p-1 bg-market-sidebar/30 rounded-xl border border-market-border/10 backdrop-blur-sm">
          {['weekly', 'monthly', 'all'].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                timeframe === t 
                  ? 'bg-market-accent text-market-bg shadow-lg hover:scale-103' 
                  : 'text-market-text/60 hover:text-market-text'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        {[1, 0, 2].map((idx, i) => {
          const player = leaderboard[idx];
          if (!player) return null;
          
          const isFirst = idx === 0;  // The winner (Middle)
          const isSecond = i === 0;   // Left card
          const isThird = i === 2;    // Right card

          // Logic for position-based Glow Colors
          let glowColor = "142 80 70"; 
          if (isFirst) glowColor = "45 100 50";  // Gold
          if (isSecond) glowColor = "210 20 80"; // Silver
          if (isThird) glowColor = "25 60 45";   // Bronze

          return (
            <BorderGlow key={player.username || idx} glowColor={glowColor} glowIntensity={isFirst ? 1.5 : 1.0}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className={`relative flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 
                  ${isFirst ? 'bg-market-sidebar/40 border-market-accent/40 shadow-xl md:h-80 z-20' : ''}
                  ${isSecond ? 'bg-market-sidebar/20 border-market-border/10 md:h-65 z-10' : ''}
                  ${isThird ? 'bg-market-sidebar/10 border-market-border/5 md:h-58 opacity-80 z-0' : ''}
                  /* Visual Order */
                  ${i === 0 ? 'order-2 md:order-1' : ''}
                  ${i === 1 ? 'order-1 md:order-2' : ''}
                  ${i === 2 ? 'order-3 md:order-3' : ''}
                `}
              >
                {isFirst && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Crown className="h-14 w-14 text-yellow-400 fill-yellow-400/20 drop-shadow-glow" />
                    </motion.div>
                  </div>
                )}
                
                <div className="text-5xl mb-4 p-4 bg-market-bg/50 rounded-2xl ring-1 ring-market-border/10">
                  {player.avatar}
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  {getRankIcon(player.rank)}
                  <span className={`font-bold truncate max-w-37.5 ${player.isUser ? 'text-market-accent' : ''}`}>
                    {player.username}
                  </span>
                </div>
                
                <div className="flex items-center text-green-400 font-mono text-lg font-bold">
                  <DollarSign className="h-4 w-4" />
                  {player.profit.toLocaleString()}
                </div>
                
                <div className="mt-auto text-xs text-market-text/40 uppercase tracking-widest font-bold">
                  {player.wins} Wins
                </div>
              </motion.div>
            </BorderGlow>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-market-sidebar/10 rounded-3xl border border-market-border/5 overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-5 p-6 border-b border-market-border/5 text-xs font-bold uppercase tracking-wider text-market-text/40">
          <span className="col-span-2 px-4">Predictor</span>
          <span className="text-right">Balance</span>
          <span className="text-right">Profit</span>
          <span className="text-right px-4">Success</span>
        </div>
        
        <div className="divide-y divide-market-border/5">
          {leaderboard.map((player, i) => (
            <motion.div
              key={`${player.username}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-5 p-5 items-center hover:bg-market-sidebar/20 transition-all group ${
                player.isUser ? 'bg-market-accent/5 border-l-2 border-market-accent' : ''
              }`}
            >
              <div className="col-span-2 flex items-center gap-4 px-4">
                <span className="w-8 flex justify-center">{getRankIcon(player.rank)}</span>
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{player.avatar}</span>
                <span className={`font-medium truncate max-w-50 ${player.isUser ? 'text-market-accent font-bold' : ''}`}>
                  {player.username}
                  {player.isUser && <span className="ml-2 text-[10px] bg-market-accent/20 text-market-accent px-2 py-0.5 rounded-full uppercase">You</span>}
                </span>
              </div>
              
              <div className="text-right font-mono text-sm text-market-text/80">
                ${player.balance.toLocaleString()}
              </div>
              
              <div className="text-right font-mono text-sm font-bold text-green-400">
                +${player.profit.toLocaleString()}
              </div>
              
              <div className="text-right px-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-market-sidebar/40 rounded-full border border-market-border/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-market-accent animate-pulse" />
                  <span className="text-xs font-bold text-market-text/60">{player.wins}W</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}