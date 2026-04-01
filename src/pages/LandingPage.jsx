import { MEME_CATEGORIES } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="p-6 flex flex-col gap-8 w-full max-w-full overflow-hidden">
      {/* Title with your HEHE Slate color */}
      <h1 className="font-bold text-4xl text-market-text tracking-tight">
        BetnYahoo
      </h1>

      {/* Categories Bar */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar items-center">
        {MEME_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-market-action hover:scale-103 transition-all whitespace-nowrap group shadow-sm cursor-pointer backdrop-blur-sm "
          >
            {/* The Emoji stays a nice size */}
            <span className="text-lg leading-none">{cat.emoji}</span>
            
            {/* The Label - forced to stay small and bold */}
            <span className="font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300 group-hover:text-market-action">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}