import { MEME_CATEGORIES } from "@/lib/constants";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="p-8 w-full">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-market-text mb-2">Marketplace</h1>
        <p className="text-market-text/60">Predict the next viral sensation.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-market-text mb-6 flex items-center gap-2">
          <span>Explore Categories</span>
          <div className="h-px flex-1 bg-market-border/20" />
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {MEME_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-market-border/10 bg-market-sidebar/5 hover:bg-market-sidebar/20 transition-colors group relative overflow-hidden cursor-pointer"
              style={{ borderColor: `${category.color}20` }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: category.color }}
              />
              <div 
                className="text-3xl mb-3 p-3 rounded-full bg-market-bg border border-market-border/10 group-hover:border-market-accent/30 transition-colors"
                style={{ color: category.color }}
              >
                {category.icon}
              </div>
              <span className="text-sm font-medium text-market-text group-hover:text-market-accent transition-colors">
                {category.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured / Trending placeholder */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-market-text">Trending Now</h2>
          <button className="text-sm text-market-accent hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-market-sidebar/10 border border-market-border/10 animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
}