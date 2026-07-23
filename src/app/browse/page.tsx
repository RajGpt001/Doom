"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, Grid, RotateCcw, Film } from "lucide-react";
import { FULL_CATALOG_ITEMS, ExtendedMediaItem } from "@/data/mockMedia";
import { LongFormCard } from "@/components/cards/LongFormCard";
import { cn } from "@/lib/utils";

const GENRES = ["All", "Sci-Fi", "Cyberpunk", "Action", "Thriller", "Drama", "Historical"];
const LANGUAGES = ["All", "English", "Japanese", "Korean", "Spanish"];
const YEARS = ["All", "2026", "2025", "2024"];
const TYPES = ["All", "movie", "series"];

export default function BrowsePage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const resetFilters = () => {
    setSelectedGenre("All");
    setSelectedLanguage("All");
    setSelectedYear("All");
    setSelectedType("All");
  };

  const filteredItems = useMemo(() => {
    return FULL_CATALOG_ITEMS.filter((item) => {
      const matchGenre =
        selectedGenre === "All" || item.genre.includes(selectedGenre);
      const matchLanguage =
        selectedLanguage === "All" || item.language === selectedLanguage;
      const matchYear =
        selectedYear === "All" || item.year.toString() === selectedYear;
      const matchType = selectedType === "All" || item.type === selectedType;

      return matchGenre && matchLanguage && matchYear && matchType;
    });
  }, [selectedGenre, selectedLanguage, selectedYear, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Film className="w-6 h-6 text-[var(--accent-main)]" />
          <h1 className="font-display font-black uppercase text-2xl sm:text-4xl text-[var(--foreground)] tracking-wider">
            Explore Long-Form Catalog
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Filter through 4K feature films, limited series, and original productions.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2 font-display text-xs uppercase font-bold text-[var(--foreground)]">
            <SlidersHorizontal className="w-4 h-4 text-[var(--accent-main)]" />
            <span>Catalog Filters</span>
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-main)] transition-colors focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>

        {/* Filter Chip Rows */}
        <div className="space-y-3">
          {/* Genre Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] w-20 shrink-0">
              Genre:
            </span>
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={cn(
                  "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-all focus:outline-none cursor-pointer",
                  selectedGenre === g
                    ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] shadow-sm"
                    : "bg-[var(--surface-base)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Language Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] w-20 shrink-0">
              Language:
            </span>
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLanguage(l)}
                className={cn(
                  "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-all focus:outline-none cursor-pointer",
                  selectedLanguage === l
                    ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] shadow-sm"
                    : "bg-[var(--surface-base)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Year & Type Chips */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
                Year:
              </span>
              {YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={cn(
                    "px-2.5 py-0.5 text-xs font-semibold rounded border transition-colors cursor-pointer",
                    selectedYear === y
                      ? "border-[var(--accent-main)] text-[var(--accent-main)] bg-[var(--accent-subtle)]"
                      : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {y}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
                Format:
              </span>
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={cn(
                    "px-2.5 py-0.5 text-xs font-semibold capitalize rounded border transition-colors cursor-pointer",
                    selectedType === t
                      ? "border-[var(--accent-main)] text-[var(--accent-main)] bg-[var(--accent-subtle)]"
                      : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Grid Results Counter */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>Showing <strong className="text-[var(--foreground)]">{filteredItems.length}</strong> titles matching criteria</span>
      </div>

      {/* Animated Grid Container */}
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
              transition={{ duration: 0.25 }}
              className="flex justify-center"
            >
              <LongFormCard item={item} aspectRatio="poster" className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center space-y-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
          <Filter className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
          <h3 className="font-display font-bold uppercase text-lg text-[var(--foreground)]">
            No Titles Match Selected Filters
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            Try adjusting your genre, language, or year filters to find available titles.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[var(--accent-main)] text-[var(--accent-foreground)] rounded hover:brightness-110"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
