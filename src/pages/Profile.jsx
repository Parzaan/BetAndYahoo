import React, { useEffect, useRef, useMemo } from 'react';
import { createChart, ColorType, BaselineSeries } from 'lightweight-charts';
import { useAuth } from '@/context/AuthContext';
import { achievements } from '@/lib/mockMemes';
import BorderGlow from '@/components/ui/BorderGlow';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { 
  IconTrophy, 
  IconTrendingUp, 
  IconWallet, 
  IconHistory, 
  IconActivity,
  IconArrowUpRight,
} from '@tabler/icons-react';

const getVibeStatus = (balance) => {
  if (balance < 5000) return { label: 'Normie', color: '#BFB1C1' };
  if (balance < 15000) return { label: 'Paper Hands', color: '#FFA500' };
  if (balance < 40000) return { label: 'Market Maker', color: '#00D1FF' };
  return { label: 'Giga-Whale', color: '#39FF14' };
};

const generatePortfolioHistory = (currentBalance) => {
  const data = [];
  const points = 80; // Reduced points for better performance
  const startValue = currentBalance / 1.15; 
  let price = startValue;
  const now = Math.floor(Date.now() / 1000);
  const oneDay = 24 * 60 * 60;
  
  for (let i = points; i >= 0; i--) {
    const time = now - i * (oneDay / 8); 
    const volatility = price * 0.006;
    const change = (Math.random() - 0.43) * volatility; 
    price += change;
    data.push({ time, value: parseFloat(price.toFixed(2)) });
  }
  
  data[data.length - 1].value = currentBalance;
  return data;
};

const StatItem = ({ label, value, color = "#39FF14" }) => (
  <div className="flex flex-col gap-0.5 border-l border-white/10 pl-4 py-1">
    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
    <span className="text-2xl font-black font-mono tracking-tighter" style={{ color }}>{value}</span>
  </div>
);

export default function Profile() {
  const { user } = useAuth();
  const chartContainerRef = useRef();
  const chartInstance = useRef(null);
  const seriesInstance = useRef(null);
  
  const vibe = useMemo(() => getVibeStatus(user?.balance || 0), [user?.balance]);
  const historyData = useMemo(() => generatePortfolioHistory(user?.balance || 10000), [user?.balance]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#BFB1C1',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 320,
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(BaselineSeries, {
      baseValue: { type: 'price', price: historyData[0].value },
      topLineColor: '#39FF14',
      topFillColor1: 'rgba(57, 255, 20, 0.1)',
      topFillColor2: 'rgba(57, 255, 20, 0.0)',
      bottomLineColor: '#FF3131',
      bottomFillColor1: 'rgba(255, 49, 49, 0.0)',
      bottomFillColor2: 'rgba(255, 49, 49, 0.1)',
      lineWidth: 2,
    });

    series.setData(historyData);
    chart.timeScale().fitContent();
    
    chartInstance.current = chart;
    seriesInstance.current = series;

    const handleResize = () => {
      if (chartContainerRef.current && chartInstance.current) {
        chartInstance.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
      }
    };
  }, []); 

  useEffect(() => {
    if (seriesInstance.current) {
      seriesInstance.current.setData(historyData);
    }
  }, [historyData]);

  const userAchievements = user?.achievements || [];

  return (
    <div className="flex-1 bg-[#071108] min-h-screen text-white flex flex-col p-8 sm:p-12 overflow-y-auto overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6"
        >
          <div className="relative">
            <img 
              src={user?.avatar || "https://assets.aceternity.com/manu.png"} 
              className="h-28 w-28 rounded-3xl border border-white/10 object-cover grayscale brightness-110"
              alt="Avatar"
            />
            <div className="absolute -bottom-2 -right-2 bg-white text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
              STATUS: {vibe.label}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-2">
              {user?.username || 'Trader'}
            </h1>
            <div className="flex items-center gap-4 text-white/30 text-[10px] uppercase font-bold tracking-[0.2em]">
              <span>ID: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
              <span>Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-8 lg:gap-16"
        >
          <StatItem label="Wallet Balance" value={`${(user?.balance || 0).toLocaleString()} MB`} />
          <StatItem label="Global Ranking" value="#42" color="#BFB1C1" />
          <StatItem label="Profit Index" value="+14.2%" />
        </motion.div>
      </div>

      {/* CHART & CORE STATS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        <div className="xl:col-span-2">
          <BorderGlow 
            className="p-8 h-[450px]"
            glowColor="142 100 54"
            colors={['#39FF14', '#071108']}
            fillOpacity={0.02}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <IconActivity className="text-[#39FF14]" size={16} />
                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Portfolio Analytics</span>
              </div>
            </div>
            <div ref={chartContainerRef} className="w-full h-full pb-4" />
          </BorderGlow>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
             <div className="flex items-center gap-2 mb-8 text-[#39FF14]">
                <IconWallet size={18} />
                <h3 className="text-xs uppercase tracking-widest font-black">Trade Performance</h3>
             </div>
             <div className="space-y-6">
                {[
                  { label: 'Total Executions', value: `${user?.wins + (user?.losses || 0)}` },
                  { label: 'Success Rate', value: '89%' },
                  { label: 'High Score', value: '1,420 MB', color: '#BFB1C1' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-baseline border-b border-white/5 pb-4">
                    <span className="text-[10px] text-white/20 uppercase font-black">{stat.label}</span>
                    <span className="text-xl font-mono" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
             </div>
          </div>

          <BorderGlow 
            className="p-8"
            glowColor="142 100 54"
            colors={['#BFB1C1', '#39FF14']}
            fillOpacity={0.01}
          >
            <div className="flex items-center gap-2 mb-6">
              <IconTrophy size={18} className="text-[#BFB1C1]" />
              <h3 className="text-xs uppercase tracking-widest font-black">Elite Achievements</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {achievements.slice(0, 8).map((ach) => { // Compact view
                const isUnlocked = userAchievements.includes(ach.id);
                return (
                  <div 
                    key={ach.id} 
                    className={cn(
                      "aspect-square flex items-center justify-center rounded-xl transition-all",
                      isUnlocked 
                        ? "bg-white/10 border border-[#39FF14]/20 text-2xl" 
                        : "bg-white/[0.02] border border-white/5 text-xl grayscale opacity-10"
                    )}
                    title={ach.title}
                  >
                    {ach.emoji}
                  </div>
                );
              })}
            </div>
          </BorderGlow>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-8">
          <IconHistory size={18} className="text-white/20" />
          <h3 className="text-xs uppercase tracking-widest font-black">Recent Activity Feed</h3>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-2 overflow-hidden overflow-x-auto">
          <div className="min-w-[800px] flex flex-col">
            {[
              { asset: 'Distracted Boyfriend', type: 'YES', status: 'WIN', profit: '2,400', time: '2m' },
              { asset: 'AI Drake Meme', type: 'NO', status: 'WIN', profit: '1,850', time: '14m' },
              { asset: 'Expanding Brain', type: 'YES', status: 'LOSS', profit: '-400', time: '1h' },
            ].map((row, i) => (
               <div key={i} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-all rounded-3xl group">
                  <div className="flex items-center gap-8 flex-1">
                     <div className="h-10 w-10 bg-white/5 rounded-2xl flex items-center justify-center text-[#39FF14]">
                        <IconArrowUpRight size={20} className={row.status === 'WIN' ? '' : 'rotate-90 text-red-500'} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tighter">{row.asset}</span>
                        <span className="text-[10px] text-white/20 uppercase font-black">Position: {row.type} // {row.time} ago</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-12 flex-1 justify-end">
                     <span className={cn(
                       "text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded",
                       row.status === 'WIN' ? "bg-[#39FF14]/10 text-[#39FF14]" : "bg-red-500/10 text-red-500"
                     )}>{row.status}</span>
                     <span className="text-lg font-mono font-black" style={{ color: row.status === 'WIN' ? "#39FF14" : "#BFB1C1" }}>
                       {row.status === 'WIN' ? '+' : ''}{row.profit} MB
                     </span>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
