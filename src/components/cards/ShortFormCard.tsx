"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, Layers, Bookmark, Check, Volume2, VolumeX, Star } from "lucide-react";
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
    }, 350);
  }, [previewSrc]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
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

  return (
    <>
      {/* ── Full Screen Player Modal ── */}
      <AnimatePresence>
        {showFullPlayer && item.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center"
            onClick={handleClosePlayer}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[var(--primary)]/40"
              style={{ width: "min(360px, 90vw)", aspectRatio: "9/16" }}
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
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center text-base font-bold hover:bg-[var(--primary)] transition-all z-10 cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Card wrapper — keeps layout space ── */}
      <div
        className={cn(
          "relative flex-shrink-0 w-[150px] sm:w-[180px] select-none",
          className
        )}
        style={{ aspectRatio: "9/16" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Static thumbnail card ── */}
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-[var(--primary)] shadow-md cursor-pointer">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover brightness-90"
            loading="lazy"
          />
          {/* 1-MIN badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
              <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
            </span>
          </div>
          {/* Bookmark */}
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); toggleWatchlist(item.id); }}
              className={cn("p-1.5 rounded-full border transition-colors cursor-pointer",
                isBookmarked ? "bg-[var(--primary)] text-white border-transparent" : "bg-black/60 border-white/20 text-white hover:border-[var(--primary)]"
              )}
            >
              {isBookmarked ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
            </button>
          </div>
          {/* Bottom overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10">
            <div className="flex items-center gap-1 text-[10px] text-[var(--primary)] font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3 h-3" />
              <span>{item.episodesCount} Episodes</span>
            </div>
            <h3 className="font-heading uppercase text-xs text-white line-clamp-2 leading-tight">{item.title}</h3>
            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] mt-1">
              <span>{item.genre?.[0]}</span>
              <span className="text-white font-bold">{item.rating}</span>
            </div>
          </div>
        </div>

        {/* ── Expanded hover popup — same 9:16 ratio, just bigger, anchored to card ── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute z-50 rounded-xl overflow-hidden shadow-2xl shadow-black/70 border-2 border-[var(--primary)]/60 cursor-pointer"
              /* 
                Position: centred on the original card.
                Width = 1.6× the card. Height kept exact 9:16.
                left/top offset pulls it out from the card centre.
              */
              style={{
                width: "260px",
                aspectRatio: "9/16",
                /* centre horizontally over the card */
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onMouseLeave={handleMouseLeave}
            >
              {/* Video fills the full 9:16 popup */}
              {previewSrc ? (
                <video
                  ref={previewRef}
                  src={previewSrc}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted={isMuted}
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img src={item.posterUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              )}

              {/* Dark vignette over video */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 z-10" />

              {/* Top row: 1-MIN + LIVE badge + mute */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
                  <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[8px] font-bold uppercase bg-red-600/90 text-white rounded flex items-center gap-1 animate-pulse font-heading">
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" /> PREVIEW
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = !isMuted;
                      setIsMuted(next);
                      if (previewRef.current) previewRef.current.muted = next;
                    }}
                    className="p-1.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[var(--primary)] hover:border-transparent transition-all cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Bottom info + buttons overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col gap-2.5">
                {/* Genre + rating */}
                <div className="flex items-center gap-2">
                  {item.genre?.slice(0, 2).map((g) => (
                    <span key={g} className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 border border-white/20 text-white font-heading uppercase font-bold">
                      {g}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-yellow-400 font-bold">
                    <Star className="w-3 h-3 fill-current" /> 4.7
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading uppercase text-white text-sm leading-snug line-clamp-2">
                  {item.title}
                </h3>

                {/* Meta */}
                <p className="text-[10px] text-[var(--text-secondary)] line-clamp-2">
                  {item.description || `${item.badge} • ${item.duration}`}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handlePlayClick}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-lg shadow-[var(--primary)]/30"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Play Now
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWatchlist(item.id); }}
                    className={cn(
                      "p-2.5 rounded-lg border transition-all cursor-pointer",
                      isBookmarked
                        ? "bg-[var(--primary)] text-white border-transparent"
                        : "bg-white/10 border-white/20 text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/20"
                    )}
                  >
                    {isBookmarked ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
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
