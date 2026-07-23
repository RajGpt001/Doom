"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Layers, Sparkles, ChevronUp, ChevronDown, ListFilter, Bookmark } from "lucide-react";
import { MOCK_SHORT_FORM_SERIES } from "@/data/mockMedia";
import { ShortPlayerCard } from "@/components/shorts/ShortPlayerCard";
import { cn } from "@/lib/utils";

export default function ShortsFeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredShorts = MOCK_SHORT_FORM_SERIES.filter(
    (item) => selectedGenre === "All" || item.genre.includes(selectedGenre)
  );

  const activeItem = filteredShorts[currentIndex] || MOCK_SHORT_FORM_SERIES[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredShorts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredShorts.length) % filteredShorts.length);
  };

  // Keyboard Up/Down Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredShorts.length]);

  return (
    <div className="min-h-[85vh] py-4 px-4 flex flex-col items-center justify-between select-none">
      
      {/* Top Header Filter Bar */}
      <div className="w-full max-w-sm flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 font-display text-xs font-black uppercase text-[var(--micro-drama-accent)] bg-[var(--micro-drama-bg)] px-3 py-1.5 rounded border border-[var(--micro-drama-accent)]/40">
          <Zap className="w-4 h-4 fill-current animate-pulse" />
          <span>MICRO-SERIES FEED</span>
        </div>

        {/* Filter Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {["All", "Suspense", "Horror", "Romance"].map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGenre(g);
                setCurrentIndex(0);
              }}
              className={cn(
                "px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded border transition-all cursor-pointer shrink-0",
                selectedGenre === g
                  ? "bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] border-[var(--micro-drama-accent)]"
                  : "bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--foreground)]"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Card Stack Container */}
      <div className="relative w-full max-w-sm flex items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          <ShortPlayerCard
            key={activeItem.id}
            item={activeItem}
            isActive={true}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </AnimatePresence>
      </div>

      {/* Bottom Hint */}
      <div className="mt-3 text-center text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-2">
        <span>Use <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)] font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)] font-mono text-[10px]">↓</kbd> or Next Ep button to flip chapters</span>
      </div>

    </div>
  );
}
