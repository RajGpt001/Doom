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
      <div className="relative rounded-sm overflow-hidden bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--primary)] transition-all duration-200 shadow-md">
        
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
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
            loading="lazy"
          />

          {/* Top Badges - Signature Red Theme */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
            {item.badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--primary)] text-white rounded-sm font-heading">
                {item.badge}
              </span>
            )}
            {item.trendingRank && (
              <span className="ml-auto w-6 h-6 flex items-center justify-center font-heading font-bold text-xs bg-[var(--primary)] text-white rounded-sm">
                #{item.trendingRank}
              </span>
            )}
          </div>
        </div>

        {/* Card Static Title Footer */}
        <div className="p-3 bg-[var(--surface)] flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="font-heading uppercase text-sm sm:text-base tracking-wide truncate text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-medium">
            <span className="text-[var(--primary)] font-bold">{item.year}</span>
            <span>•</span>
            <span className="border border-[var(--border)] px-1 rounded text-[10px]">
              {item.rating}
            </span>
            <span>•</span>
            <span>{item.type === "series" ? `${item.seasonCount} S` : item.duration}</span>
          </div>
        </div>

        {/* Hover Preview Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex flex-col justify-between p-3.5 bg-[var(--surface-elevated)] border-2 border-[var(--primary)]"
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
                  className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/80 text-white hover:text-[var(--primary)] text-xs cursor-pointer"
                >
                  {isPreviewMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expanded Info & Action Controls */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading uppercase text-sm tracking-wider text-[var(--text-primary)] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[var(--text-secondary)] line-clamp-2 leading-tight mb-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/title/${item.id}`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer"
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
                        "p-1.5 rounded border transition-colors cursor-pointer",
                        isBookmarked
                          ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                          : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]"
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
                      className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] cursor-pointer"
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
