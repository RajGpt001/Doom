"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Layers, Bookmark, Check } from "lucide-react";
import { MediaItem, useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

/**
 * ShortFormCard Component
 * Distinct 9:16 Vertical Card shape & kinetic motion specifically designed for 
 * 1-minute Micro-Dramas and Web-Series episodes. Uses Acid-Lime kinetic accents!
 */
interface ShortFormCardProps {
  item: MediaItem;
  className?: string;
}

export function ShortFormCard({ item, className }: ShortFormCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useAppStore();
  const isBookmarked = isInWatchlist(item.id);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative flex-shrink-0 w-[150px] sm:w-[180px] aspect-[9/16] cursor-pointer select-none group",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Matte Container with Kinetic Chamfered Border & Acid-Lime Accent */}
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--surface-base)] border-2 border-[var(--border)] group-hover:border-[var(--micro-drama-accent)] transition-all duration-300 shadow-md">
        
        {/* Main Background Image */}
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Header Tags */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[var(--micro-drama-bg)] text-[var(--micro-drama-accent)] border border-[var(--micro-drama-accent)]/50 rounded flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(item.id);
            }}
            className={cn(
              "p-1.5 rounded-full border text-xs transition-colors",
              isBookmarked
                ? "bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] border-transparent"
                : "bg-black/60 border-white/20 text-white hover:border-[var(--micro-drama-accent)]"
            )}
          >
            {isBookmarked ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
          </button>
        </div>

        {/* Hover Center Quick Play Pulse */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: isHovered ? 1 : 0.8 }}
            className="w-12 h-12 rounded-full bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] flex items-center justify-center font-black shadow-lg"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </motion.div>
        </div>

        {/* Bottom Details Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-1 z-10">
          <div className="flex items-center gap-1 text-[10px] text-[var(--micro-drama-accent)] font-bold uppercase tracking-wider">
            <Layers className="w-3 h-3" />
            <span>{item.episodesCount} Episodes</span>
          </div>

          <h3 className="font-display font-extrabold text-xs uppercase tracking-tight text-white line-clamp-2 leading-tight group-hover:text-[var(--micro-drama-accent)] transition-colors">
            {item.title}
          </h3>

          <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1 border-t border-white/10">
            <span>{item.genre[0]}</span>
            <span className="text-white font-bold">{item.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
