"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Check, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { ExtendedMediaItem } from "@/data/mockMedia";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  items: ExtendedMediaItem[];
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useAppStore();

  const activeItem = items[currentIndex] || items[0];
  const isBookmarked = isInWatchlist(activeItem.id);

  // Auto Rotation Timer
  useEffect(() => {
    if (isPaused || isPlayingTrailer) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, isPlayingTrailer, items.length]);

  const handleNext = () => {
    setIsPlayingTrailer(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsPlayingTrailer(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div
      className="relative w-full min-h-[70vh] md:min-h-[82vh] flex items-end px-4 md:px-12 pb-12 pt-16 overflow-hidden select-none bg-[var(--background)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background Media Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id + (isPlayingTrailer ? "-trailer" : "-banner")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-0"
        >
          {isPlayingTrailer && activeItem.videoUrl ? (
            <video
              src={activeItem.videoUrl}
              autoPlay
              controls
              onEnded={() => setIsPlayingTrailer(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={activeItem.bannerUrl || activeItem.posterUrl}
              alt={activeItem.title}
              className="w-full h-full object-cover object-top scale-105 transition-transform duration-1000"
            />
          )}

          {/* Vignette Gradients (Dark Red & Black Blend) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/60 to-transparent z-10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Details */}
      <div className="relative z-20 max-w-2xl space-y-4">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id + "-info"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded-sm font-heading">
                {activeItem.badge}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold text-[var(--text-secondary)] bg-[var(--surface-elevated)] border border-[var(--border)] rounded-sm flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[var(--primary)] fill-current" /> FEATURED #{currentIndex + 1}
              </span>
            </div>

            <h1 className="font-heading uppercase text-4xl sm:text-6xl md:text-7xl tracking-wider text-white drop-shadow-xl leading-none">
              {activeItem.title}
            </h1>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
              <span className="text-[var(--primary)] font-bold">{activeItem.year}</span>
              <span>•</span>
              <span className="border border-[var(--border)] px-1.5 py-0.5 rounded text-xs">
                {activeItem.rating}
              </span>
              <span>•</span>
              <span>{activeItem.duration || `${activeItem.seasonCount} Seasons`}</span>
              <span>•</span>
              <span className="text-[var(--text-primary)]">{activeItem.genre.join(" / ")}</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-200 line-clamp-3 leading-relaxed max-w-xl drop-shadow-md">
              {activeItem.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsPlayingTrailer(!isPlayingTrailer)}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-sm uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-lg shadow-[var(--primary)]/20"
              >
                <Play className="w-4 h-4 fill-current" />
                {isPlayingTrailer ? "Stop Preview" : "Watch Trailer"}
              </button>

              <button
                onClick={() => toggleWatchlist(activeItem.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 font-heading text-sm uppercase tracking-wider rounded-sm border transition-all cursor-pointer",
                  isBookmarked
                    ? "bg-[var(--primary-muted)] border-[var(--primary)] text-white"
                    : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]"
                )}
              >
                {isBookmarked ? <Check className="w-4 h-4 text-[var(--primary)]" /> : <Plus className="w-4 h-4" />}
                {isBookmarked ? "In Watchlist" : "Watchlist"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls Bar */}
      <div className="absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-3">
        {/* Indicator Dots */}
        <div className="flex items-center gap-1.5 mr-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlayingTrailer(false);
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                idx === currentIndex
                  ? "w-7 bg-[var(--primary)]"
                  : "w-1.5 bg-[var(--border)] hover:bg-[var(--text-secondary)]"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev & Next Buttons */}
        <button
          onClick={handlePrev}
          className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
