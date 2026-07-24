"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, Layers, Bookmark, Check, Volume2, VolumeX, Star } from "lucide-react";
import { MediaItem, useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface ShortFormCardProps {
  item: MediaItem;
  className?: string;
}

// Popup width in px — height auto by 9:16
const POPUP_W = 240;
const POPUP_H = POPUP_W * (16 / 9);

export function ShortFormCard({ item, className }: ShortFormCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullPlayerRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  const { toggleWatchlist, isInWatchlist } = useAppStore();
  const isBookmarked = isInWatchlist(item.id);
  const previewSrc = (item as any).previewUrl || item.videoUrl;

  useEffect(() => { setMounted(true); }, []);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate fixed position: centre popup over the card
      let left = rect.left + rect.width / 2 - POPUP_W / 2;
      let top  = rect.top  + rect.height / 2 - POPUP_H / 2;

      // Clamp to viewport
      left = Math.max(8, Math.min(left, window.innerWidth  - POPUP_W - 8));
      top  = Math.max(8, Math.min(top,  window.innerHeight - POPUP_H - 8));

      setPopupPos({ top, left });
      setIsHovered(true);
    }, 350);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovered(false);
    setPopupPos(null);
    if (previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  }, []);

  // Start video when popup becomes visible
  useEffect(() => {
    if (isHovered && previewRef.current && previewSrc) {
      previewRef.current.play().catch(() => {});
    }
  }, [isHovered, previewSrc]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullPlayer(true);
    handleMouseLeave();
  };

  const handleClosePlayer = () => {
    setShowFullPlayer(false);
    if (fullPlayerRef.current) fullPlayerRef.current.pause();
  };

  const popup = isHovered && popupPos && mounted ? createPortal(
    <AnimatePresence>
      <motion.div
        key={`popup-${item.id}`}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          top: popupPos.top,
          left: popupPos.left,
          width: POPUP_W,
          height: POPUP_H,
          zIndex: 9999,
        }}
        className="rounded-xl overflow-hidden shadow-2xl shadow-black/80 border-2 border-[var(--primary)]/70 cursor-pointer"
      >
        {/* Video fills 100% — preserves original aspect ratio via object-contain */}
        {previewSrc ? (
          <video
            ref={previewRef}
            src={previewSrc}
            className="absolute inset-0 w-full h-full object-contain bg-black"
            muted={isMuted}
            loop
            playsInline
            autoPlay
          />
        ) : (
          <img src={item.posterUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
        )}

        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent z-10" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/95 to-transparent z-10" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
            <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase bg-red-600/90 text-white rounded flex items-center gap-1 animate-pulse font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              PREVIEW
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

        {/* Bottom info + buttons */}
        <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {item.genre?.slice(0, 2).map((g) => (
              <span key={g} className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 border border-white/20 text-white font-heading uppercase font-bold">
                {g}
              </span>
            ))}
            <span className="ml-auto flex items-center gap-1 text-[10px] text-yellow-400 font-bold">
              <Star className="w-3 h-3 fill-current" /> 4.7
            </span>
          </div>

          <h3 className="font-heading uppercase text-white text-sm leading-snug line-clamp-2">
            {item.title}
          </h3>

          <p className="text-[10px] text-[#A3A3A3] line-clamp-2 leading-relaxed">
            {item.badge} • {item.duration}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePlayClick}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-lg"
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
                  : "bg-white/10 border-white/20 text-white hover:border-[var(--primary)]"
              )}
            >
              {isBookmarked ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <>
      {/* Full Screen Player Modal */}
      <AnimatePresence>
        {showFullPlayer && item.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/92 backdrop-blur-sm flex items-center justify-center"
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
                className="w-full h-full object-contain bg-black"
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

      {/* Render popup via portal (escapes overflow:hidden parents) */}
      {popup}

      {/* Base thumbnail card */}
      <div
        ref={cardRef}
        className={cn(
          "relative flex-shrink-0 w-[150px] sm:w-[180px] select-none cursor-pointer",
          className
        )}
        style={{ aspectRatio: "9/16" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] shadow-md transition-all duration-200 hover:border-[var(--primary)]">
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
            <div className="flex items-center justify-between text-[10px] text-[#A3A3A3] mt-1">
              <span>{item.genre?.[0]}</span>
              <span className="text-white font-bold">{item.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
