"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  Bookmark,
  Check,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Zap,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
} from "lucide-react";
import { ExtendedMediaItem } from "@/data/mockMedia";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface ShortPlayerCardProps {
  item: ExtendedMediaItem;
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function ShortPlayerCard({
  item,
  isActive,
  onNext,
  onPrev,
}: ShortPlayerCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likesCount || 14200);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);

  const { isMuted, toggleMute, toggleWatchlist, isInWatchlist } = useAppStore();
  const isBookmarked = isInWatchlist(item.id);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(item.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const totalEps = item.totalEpisodesInSeries || 8;
  const currentEp = item.currentEpisodeNumber || 1;

  // Reduced motion vs 3D transform variants
  const motionVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { rotateX: 25, opacity: 0.5, scale: 0.95 },
        animate: { rotateX: 0, opacity: 1, scale: 1 },
        exit: { rotateX: -25, opacity: 0, scale: 0.95 },
      };

  return (
    <motion.div
      initial={motionVariants.initial}
      animate={motionVariants.animate}
      exit={motionVariants.exit}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={shouldReduceMotion ? {} : { perspective: 1000 }}
      className="relative w-full max-w-sm aspect-[9/16] h-[78vh] sm:h-[82vh] mx-auto rounded-xl overflow-hidden bg-black border-2 border-[var(--micro-drama-accent)]/80 shadow-2xl select-none group"
    >
      {/* Video Background Layer */}
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {item.videoUrl && isActive ? (
          <video
            src={item.videoUrl}
            autoPlay={isPlaying}
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover filter contrast-[1.05]"
          />
        ) : (
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover filter grayscale-[10%]"
          />
        )}

        {/* Play/Pause Center Touch Indicator */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] flex items-center justify-center font-black shadow-xl">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Vignette Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

        {/* Bottom Vignette Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* TOP CHAPTER PROGRESS RAIL (Episode 1 of 8 Concept) */}
      <div className="absolute top-3 left-3 right-3 z-30 space-y-1.5 pointer-events-none">
        <div className="flex items-center gap-1">
          {Array.from({ length: totalEps }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                idx + 1 === currentEp
                  ? "bg-[var(--micro-drama-accent)] shadow-[0_0_10px_var(--micro-drama-accent)]"
                  : idx + 1 < currentEp
                  ? "bg-[var(--micro-drama-accent)]/50"
                  : "bg-white/20"
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white">
          <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-[var(--micro-drama-accent)]/40 text-[var(--micro-drama-accent)]">
            <Zap className="w-2.5 h-2.5 fill-current animate-pulse" />
            CHAPTER {currentEp} OF {totalEps}
          </span>

          <span className="bg-black/60 px-2 py-0.5 rounded border border-white/20 text-gray-300">
            {item.rating} • {item.duration}
          </span>
        </div>
      </div>

      {/* RIGHT SIDEBAR OVERLAY ACTION CONTROLS */}
      <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4">
        
        {/* Like Button */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleLikeToggle}
            className={cn(
              "p-3 rounded-full border transition-all duration-200 cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]",
              isLiked
                ? "bg-red-500 border-red-400 text-white scale-110"
                : "bg-black/60 border-white/20 text-white hover:border-[var(--micro-drama-accent)]"
            )}
            aria-label="Like episode"
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </button>
          <span className="text-[10px] font-bold text-white tracking-wider">
            {(likesCount / 1000).toFixed(1)}k
          </span>
        </div>

        {/* Save to Watchlist Button */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleBookmarkToggle}
            className={cn(
              "p-3 rounded-full border transition-all duration-200 cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]",
              isBookmarked
                ? "bg-[var(--micro-drama-accent)] border-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)]"
                : "bg-black/60 border-white/20 text-white hover:border-[var(--micro-drama-accent)]"
            )}
            aria-label="Save to watchlist"
          >
            {isBookmarked ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          <span className="text-[10px] font-bold text-white tracking-wider">
            {isBookmarked ? "Saved" : "Save"}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-1 relative">
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[var(--micro-drama-accent)] transition-all cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]"
            aria-label="Share short"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold text-white tracking-wider">Share</span>

          {/* Share Toast */}
          <AnimatePresence>
            {showShareToast && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-14 top-2 bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-xl whitespace-nowrap"
              >
                Link Copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mute / Unmute Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[var(--micro-drama-accent)] transition-all cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* BOTTOM METADATA OVERLAY & NEXT CHAPTER CTA */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-30 space-y-3 pointer-events-auto">
        <div className="space-y-1 max-w-[78%]">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-[var(--micro-drama-accent)] tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{item.seriesTitle || "MICRO-SERIES"}</span>
          </div>

          <h3 className="font-display font-black text-sm uppercase text-white tracking-wide leading-snug">
            {item.title}
          </h3>

          <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Next Chapter Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-white/15">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-1.5 rounded bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]"
            >
              <ChevronUp className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={onNext}
              className="p-1.5 rounded bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]"
            >
              <ChevronDown className="w-3.5 h-3.5" /> Next
            </button>
          </div>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--micro-drama-accent)]"
          >
            <span>Next Ep</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </motion.div>
  );
}
