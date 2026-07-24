"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, Layers, Bookmark, Check, Volume2, VolumeX } from "lucide-react";
import { MediaItem, useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface ShortFormCardProps {
  item: MediaItem;
  className?: string;
}

export function ShortFormCard({ item, className }: ShortFormCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullPlayerRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { toggleWatchlist, isInWatchlist } = useAppStore();
  const isBookmarked = isInWatchlist(item.id);

  const previewSrc = (item as any).previewUrl || item.videoUrl;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Small delay before starting preview to avoid accidental hovers
    hoverTimerRef.current = setTimeout(() => {
      if (previewRef.current && previewSrc) {
        previewRef.current.currentTime = 0;
        previewRef.current.play().catch(() => {});
      }
    }, 300);
  }, [previewSrc]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    if (previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  }, []);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullPlayer(true);
    setIsPlaying(true);
    // Pause preview when full player opens
    if (previewRef.current) {
      previewRef.current.pause();
    }
  };

  const handleClosePlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullPlayer(false);
    setIsPlaying(false);
    if (fullPlayerRef.current) {
      fullPlayerRef.current.pause();
    }
  };

  return (
    <>
      {/* Full Screen Video Player Modal */}
      <AnimatePresence>
        {showFullPlayer && item.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={handleClosePlayer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm mx-4 aspect-[9/16] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={fullPlayerRef}
                src={item.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
              {/* Close Button */}
              <button
                onClick={handleClosePlayer}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center text-lg font-bold hover:bg-[var(--primary)] transition-all z-10 cursor-pointer"
              >
                ✕
              </button>
              {/* Title Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <p className="font-heading text-xs uppercase text-[var(--primary)] font-bold">{item.badge}</p>
                <h3 className="font-heading text-base text-white uppercase leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative flex-shrink-0 w-[150px] sm:w-[180px] aspect-[9/16] cursor-pointer select-none group",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-[var(--primary)] transition-all duration-300 shadow-md">

          {/* Static Poster (shown when not hovering) */}
          <img
            src={item.posterUrl}
            alt={item.title}
            className={cn(
              "absolute inset-0 w-full h-full object-cover filter brightness-90 transition-opacity duration-300",
              isHovered && previewSrc ? "opacity-0" : "opacity-100"
            )}
            loading="lazy"
          />

          {/* Hover Preview Video (muted, looping) */}
          {previewSrc && (
            <video
              ref={previewRef}
              src={previewSrc}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              muted={isMuted}
              loop
              playsInline
              preload="none"
            />
          )}

          {/* Top Header Tags */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
              <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
            </span>

            <div className="flex items-center gap-1">
              {/* Mute Toggle (shown on hover) */}
              {isHovered && previewSrc && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                    if (previewRef.current) previewRef.current.muted = !isMuted;
                  }}
                  className="p-1.5 rounded-full bg-black/70 border border-white/20 text-white hover:border-[var(--primary)] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(item.id);
                }}
                className={cn(
                  "p-1.5 rounded-full border text-xs transition-colors cursor-pointer",
                  isBookmarked
                    ? "bg-[var(--primary)] text-white border-transparent"
                    : "bg-black/60 border-white/20 text-white hover:border-[var(--primary)]"
                )}
              >
                {isBookmarked ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Hover Center Play Button */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10"
                onClick={handlePlayClick}
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-2xl shadow-[var(--primary)]/50 border-2 border-white/20 hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview Live indicator */}
          {isHovered && previewSrc && (
            <div className="absolute top-10 left-2 z-10">
              <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-red-600 text-white rounded flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                PREVIEW
              </span>
            </div>
          )}

          {/* Bottom Details Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent flex flex-col gap-1 z-10">
            <div className="flex items-center gap-1 text-[10px] text-[var(--primary)] font-bold uppercase tracking-wider">
              <Layers className="w-3 h-3" />
              <span>{item.episodesCount} Episodes</span>
            </div>

            <h3 className="font-heading uppercase text-sm tracking-wide text-white line-clamp-2 leading-tight group-hover:text-[var(--primary)] transition-colors">
              {item.title}
            </h3>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-medium pt-1 border-t border-[var(--border)]">
              <span>{item.genre[0]}</span>
              <span className="text-white font-bold">{item.rating}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
