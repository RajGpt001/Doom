"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Zap, Film, Trash2, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { FULL_CATALOG_ITEMS, MOCK_SHORT_FORM_SERIES } from "@/data/mockMedia";
import { LongFormCard } from "@/components/cards/LongFormCard";
import { ShortFormCard } from "@/components/cards/ShortFormCard";
import { cn } from "@/lib/utils";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useAppStore();
  const [filterTab, setFilterTab] = useState<"all" | "long" | "shorts">("all");

  const allSavedMedia = [
    ...FULL_CATALOG_ITEMS,
    ...MOCK_SHORT_FORM_SERIES,
  ].filter((item) => watchlist.includes(item.id));

  const filteredItems = allSavedMedia.filter((item) => {
    if (filterTab === "long") return item.type === "movie" || item.type === "series";
    if (filterTab === "shorts") return item.type === "micro-drama";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[var(--accent-main)]" />
            <h1 className="font-display font-black uppercase text-2xl sm:text-4xl text-[var(--foreground)] tracking-wider">
              My Personal Watchlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Saved movies, series, and micro-drama episodes across all your devices.
          </p>
        </div>

        {/* Tab Filter Switcher */}
        <div className="flex items-center p-1 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
          <button
            onClick={() => setFilterTab("all")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer",
              filterTab === "all"
                ? "bg-[var(--accent-main)] text-[var(--accent-foreground)]"
                : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
            )}
          >
            All Saved ({allSavedMedia.length})
          </button>

          <button
            onClick={() => setFilterTab("long")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer",
              filterTab === "long"
                ? "bg-[var(--accent-main)] text-[var(--accent-foreground)]"
                : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
            )}
          >
            Films & Series
          </button>

          <button
            onClick={() => setFilterTab("shorts")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-1",
              filterTab === "shorts"
                ? "bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)]"
                : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
            )}
          >
            <Zap className="w-3 h-3 fill-current" /> Shorts
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                {item.type === "micro-drama" ? (
                  <ShortFormCard item={item} />
                ) : (
                  <LongFormCard item={item} aspectRatio="poster" className="w-full" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty Watchlist State */
        <div className="p-12 text-center space-y-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] max-w-md mx-auto">
          <Bookmark className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
          <h3 className="font-display font-bold uppercase text-base text-[var(--foreground)]">
            Your Watchlist is Empty
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Explore feature films or 1-minute micro-dramas and tap the Bookmark button to save titles.
          </p>
        </div>
      )}

    </div>
  );
}
