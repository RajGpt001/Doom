"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, Layers, Bookmark, Check, Volume2, VolumeX, Star, Clock } from "lucide-react";
import { MediaItem, useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface ShortFormCardProps {
  item: MediaItem;
  className?: string;
}

export function ShortFormCard({ item, className }: ShortFormCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullPlayerRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { toggleWatchlist, isInWatchlist } = useAppStore();
  const isBookmarked = isInWatchlist(item.id);

  const previewSrc = (item as any).previewUrl || item.videoUrl;

  const handleMouseEnter = useCallback(() => {
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(true);
      if (previewRef.current && previewSrc) {
        previewRef.current.currentTime = 0;
        previewRef.current.play().catch(() => {});
      }
    }, 400);
  }, [previewSrc]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setIsHovered(false);
    if (previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  }, []);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullPlayer(true);
    if (previewRef.current) previewRef.current.pause();
  };

  const handleClosePlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullPlayer(false);
    if (fullPlayerRef.current) fullPlayerRef.current.pause();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (previewRef.current) previewRef.current.muted = newMuted;
  };

  return (
    <>
      {/* ── Full Screen Player Modal ── */}
      <AnimatePresence>
        {showFullPlayer && item.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={handleClosePlayer}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm mx-4 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[var(--primary)]/40"
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
              <button
                onClick={handleClosePlayer}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center text-lg font-bold hover:bg-[var(--primary)] transition-all z-10 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-16 inset-x-0 px-4 pointer-events-none">
                <p className="font-heading text-[10px] uppercase text-[var(--primary)] font-bold tracking-widest">{item.badge}</p>
                <h3 className="font-heading text-sm text-white uppercase leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Card Container (relative positioning anchor) ── */}
      <div
        ref={cardRef}
        className={cn(
          "relative flex-shrink-0 w-[150px] sm:w-[180px] aspect-[9/16] cursor-pointer select-none",
          // Reserve space so expanded card doesn't shift layout
          "transition-all duration-200",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Base Thumbnail Card (always visible) ── */}
        <motion.div
          className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] transition-colors duration-300 shadow-md"
          animate={isHovered ? { borderColor: "var(--primary)", opacity: 0 } : { borderColor: "var(--border)", opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover filter brightness-90"
            loading="lazy"
          />
          {/* 1-MIN badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
              <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
            </span>
          </div>
          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10">
            <h3 className="font-heading uppercase text-xs text-white line-clamp-2 leading-tight">{item.title}</h3>
            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] mt-1">
              <span>{item.genre?.[0]}</span>
              <span className="text-white font-bold">{item.rating}</span>
            </div>
          </div>
        </motion.div>

        {/* ── EXPANDED HOVER CARD (Amazon Prime-inspired popup) ── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[230px] sm:w-[260px] rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-[var(--primary)]/50 bg-[var(--surface)]"
              style={{ aspectRatio: "9/16" }}
              onMouseEnter={() => {
                // Keep open while mouse is on expanded card
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                if (previewRef.current && previewSrc) {
                  previewRef.current.play().catch(() => {});
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {/* Video Preview Area (top ~60% of expanded card) */}
              <div className="relative w-full" style={{ height: "62%" }}>
                {previewSrc ? (
                  <video
                    ref={previewRef}
                    src={previewSrc}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
                )}

                {/* Overlay gradient on video */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />

                {/* Top badge row */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
                    <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
                  </span>
                  {/* Live preview + mute toggle */}
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase bg-red-600/90 text-white rounded flex items-center gap-1 animate-pulse font-heading">
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" /> LIVE
                    </span>
                    <button
                      onClick={toggleMute}
                      className="p-1 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[var(--primary)] transition-all cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Info panel (bottom ~38%) */}
              <div className="p-3 flex flex-col gap-2" style={{ height: "38%" }}>
                {/* Title */}
                <h3 className="font-heading uppercase text-white text-xs leading-snug line-clamp-2 group-hover:text-[var(--primary)]">
                  {item.title}
                </h3>

                {/* Meta row */}
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                  <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {item.duration || "1m"}</span>
                  <span className="px-1 rounded border border-[var(--border)] text-[9px] font-bold text-white">{item.rating}</span>
                  <span className="flex items-center gap-0.5 text-yellow-400"><Star className="w-2.5 h-2.5 fill-current" /> 4.7</span>
                </div>

                {/* Genre pills */}
                <div className="flex items-center gap-1 flex-wrap">
                  {item.genre?.slice(0, 2).map((g) => (
                    <span key={g} className="px-1.5 py-0.5 text-[9px] rounded bg-[var(--primary-muted)]/30 text-[var(--primary)] border border-[var(--primary)]/20 font-heading uppercase font-bold">
                      {g}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-auto">
                  {/* Play Button */}
                  <button
                    onClick={handlePlayClick}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer shadow-lg shadow-[var(--primary)]/30"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play
                  </button>

                  {/* Watchlist */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWatchlist(item.id); }}
                    className={cn(
                      "p-2 rounded-lg border transition-all cursor-pointer",
                      isBookmarked
                        ? "bg-[var(--primary)] text-white border-transparent"
                        : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-white"
                    )}
                  >
                    {isBookmarked ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
