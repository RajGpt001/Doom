"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Check, Info, Volume2, VolumeX } from "lucide-react";
import { MediaItem, useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface LongFormCardProps {
  item: MediaItem;
  aspectRatio?: "poster" | "landscape";
  className?: string;
}

export function LongFormCard({
  item,
  aspectRatio = "poster",
  className,
}: LongFormCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewMuted, setIsPreviewMuted] = useState(true);
  const { toggleWatchlist, isInWatchlist } = useAppStore();

  const isBookmarked = isInWatchlist(item.id);

  const handleCardClick = () => {
    router.push(`/title/${item.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "relative group flex-shrink-0 select-none cursor-pointer transition-all duration-300",
        aspectRatio === "poster" ? "w-[170px] sm:w-[210px]" : "w-[280px] sm:w-[340px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Matte Container Card */}
      <div className="relative rounded-sm overflow-hidden bg-[var(--surface-base)] border border-[var(--border)] group-hover:border-[var(--accent-main)]/60 transition-all duration-200">
        
        {/* Main Poster Image */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-[var(--surface-elevated)]",
            aspectRatio === "poster" ? "aspect-[2/3]" : "aspect-[16/9]"
          )}
        >
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
            {item.badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--surface-elevated)] text-[var(--accent-main)] border border-[var(--accent-main)]/30 rounded-sm">
                {item.badge}
              </span>
            )}
            {item.trendingRank && (
              <span className="ml-auto w-6 h-6 flex items-center justify-center font-display font-black text-xs bg-[var(--accent-main)] text-[var(--accent-foreground)] rounded-sm">
                #{item.trendingRank}
              </span>
            )}
          </div>

          {/* Continue Watching Progress Bar */}
          {item.progressPercentage && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--surface-elevated)] z-10">
              <div
                className="h-full bg-[var(--accent-main)]"
                style={{ width: `${item.progressPercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Card Static Title Footer */}
        <div className="p-3 bg-[var(--surface-base)] flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wide truncate text-[var(--foreground)] group-hover:text-[var(--accent-main)] transition-colors">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-medium">
            <span>{item.year}</span>
            <span>•</span>
            <span className="border border-[var(--border)] px-1 rounded text-[10px]">
              {item.rating}
            </span>
            <span>•</span>
            <span>{item.type === "series" ? `${item.seasonCount} S` : item.duration}</span>
          </div>
        </div>

        {/* Hover Trailer Preview Overlay (Matte Expand) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex flex-col justify-between p-3.5 bg-[var(--surface-elevated)] border-2 border-[var(--accent-main)]"
            >
              {/* Video Preview Scaffold */}
              <div className="relative w-full aspect-[16/9] bg-black rounded overflow-hidden mb-2">
                {item.videoUrl ? (
                  <video
                    src={item.videoUrl}
                    autoPlay
                    loop
                    muted={isPreviewMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPreviewMuted(!isPreviewMuted);
                  }}
                  className="absolute bottom-1.5 right-1.5 p-1 rounded bg-[var(--surface-base)]/80 text-[var(--foreground)] hover:text-[var(--accent-main)] text-xs"
                >
                  {isPreviewMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expanded Info & Action Controls */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[var(--text-muted)] line-clamp-2 leading-tight mb-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/title/${item.id}`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-main)] text-[var(--accent-foreground)] font-bold text-xs uppercase tracking-wider rounded-sm hover:brightness-110 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" /> Watch
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(item.id);
                      }}
                      className={cn(
                        "p-1.5 rounded border transition-colors",
                        isBookmarked
                          ? "bg-[var(--accent-main)] border-[var(--accent-main)] text-[var(--accent-foreground)]"
                          : "bg-[var(--surface-base)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)]"
                      )}
                      title={isBookmarked ? "In Watchlist" : "Add to Watchlist"}
                    >
                      {isBookmarked ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/title/${item.id}`);
                      }}
                      className="p-1.5 rounded bg-[var(--surface-base)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)]"
                      title="More Info"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
