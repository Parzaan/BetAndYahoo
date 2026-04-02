import React from "react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function MemeCard({ name, ticker, price, change, image, category }) {
  const isUp = change > 0;

  return (
    <div className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50 p-3 hover:border-market-action transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]">
      {/* Meme Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 rounded-full bg-black/50 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white uppercase">
          {category}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-neutral-800 dark:text-white truncate">{name}</h3>
          <span className="text-[10px] font-mono text-neutral-500 uppercase">{ticker}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-black text-neutral-900 dark:text-neutral-100">${price}</p>
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold",
            isUp ? "text-market-action" : "text-red-500"
          )}>
            {isUp ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
            {Math.abs(change)}%
          </div>
        </div>
      </div>

      {/* Quick Trade Button - Appears on Hover */}
      <button className="mt-3 w-full rounded-lg bg-market-action py-2 text-xs font-black text-black opacity-0 transition-opacity group-hover:opacity-100 active:scale-95">
        BUY {ticker}
      </button>
    </div>
  );
} 