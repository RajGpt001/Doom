"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Layers, Bookmark, Check } from "lucide-react";
import { MediaItem, useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

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
      {/* Matte Container with Signature Red Theme Accent */}
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-[var(--primary)] transition-all duration-300 shadow-md">
        
        {/* Main Background Image */}
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Header Tags */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white rounded flex items-center gap-1 font-heading">
            <Zap className="w-2.5 h-2.5 fill-current animate-pulse" /> 1-MIN
          </span>

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

        {/* Hover Center Quick Play Pulse */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: isHovered ? 1 : 0.8 }}
            className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold shadow-lg shadow-[var(--primary)]/30"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </motion.div>
        </div>

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
  );
}
