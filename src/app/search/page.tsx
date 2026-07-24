"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, SlidersHorizontal, Film, ArrowRight } from "lucide-react";
import { FULL_CATALOG_ITEMS, ExtendedMediaItem } from "@/data/mockMedia";
import { LongFormCard } from "@/components/cards/LongFormCard";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const INITIAL_RECENT_SEARCHES = [
  "Cybernetic Void",
  "Sci-Fi",
  "Proprietors of Chaos",
  "Korean Thriller",
];

export default function SearchPage() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT_SEARCHES);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState("All");

  // Debounce input (250ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearchSubmit = (text: string) => {
    setSearchQuery(text);
    if (text.trim() && !recentSearches.includes(text.trim())) {
      setRecentSearches((prev) => [text.trim(), ...prev.slice(0, 4)]);
    }
  };

  const removeRecentSearch = (itemToRemove: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  // Filter items based on debounced search text + genre chip
  const searchResults = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    return FULL_CATALOG_ITEMS.filter((item) => {
      const matchText =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.genre.some((g) => g.toLowerCase().includes(q));

      const matchGenre =
        selectedGenreFilter === "All" || item.genre.includes(selectedGenreFilter);

      return matchText && matchGenre;
    });
  }, [debouncedQuery, selectedGenreFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* Search Header */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="font-display font-black uppercase text-2xl sm:text-4xl text-[var(--foreground)] tracking-wider flex items-center gap-2">
          <Search className="w-7 h-7 text-[var(--accent-main)]" />
          Search Catalog
        </h1>

        {/* Big Search Input */}
        <div className="relative flex items-center bg-[var(--surface-elevated)] border-2 border-[var(--border)] focus-within:border-[var(--accent-main)] rounded-lg p-2.5 shadow-xl transition-all">
          <Search className="w-5 h-5 text-[var(--text-muted)] ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search movies, series, genres (e.g. Cyberpunk, Thriller)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-sm text-[var(--foreground)] focus:outline-none px-3 placeholder:text-[var(--text-muted)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--foreground)] mr-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Recent Searches Chips */}
      {recentSearches.length > 0 && !searchQuery && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <History className="w-3.5 h-3.5" />
            <span>Recent Searches</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {recentSearches.map((term) => (
              <span
                key={term}
                onClick={() => handleSearchSubmit(term)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] hover:border-[var(--accent-main)] cursor-pointer transition-colors"
              >
                <span>{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentSearch(term);
                  }}
                  className="text-[var(--text-muted)] hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Genre Filters */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
          Filter:
        </span>
        {["All", "Sci-Fi", "Cyberpunk", "Action", "Thriller", "Drama"].map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenreFilter(genre)}
            className={cn(
              "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-all focus:outline-none cursor-pointer shrink-0",
              selectedGenreFilter === genre
                ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] shadow-sm"
                : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
            )}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
        <span>
          {debouncedQuery
            ? `Results for "${debouncedQuery}"`
            : "Suggested Discoveries"}
        </span>
        <span className="font-bold text-[var(--foreground)]">{searchResults.length} Titles Found</span>
      </div>

      {/* Results Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      >
        <AnimatePresence>
          {searchResults.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <LongFormCard item={item} aspectRatio="poster" className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Zero Results State */}
      {searchResults.length === 0 && (
        <div className="p-12 text-center space-y-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] max-w-md mx-auto">
          <Film className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
          <h3 className="font-display font-bold uppercase text-base text-[var(--foreground)]">
            No Titles Found for "{debouncedQuery}"
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Try searching for terms like "Cyberpunk", "Sci-Fi", or "Thriller".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGenreFilter("All");
            }}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[var(--accent-main)] text-[var(--accent-foreground)] rounded"
          >
            Clear Search
          </button>
        </div>
      )}

    </div>
  );
}
