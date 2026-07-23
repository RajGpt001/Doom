"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { MediaItem } from "@/store/useAppStore";
import { LongFormCard } from "@/components/cards/LongFormCard";
import { ShortFormCard } from "@/components/cards/ShortFormCard";
import { cn } from "@/lib/utils";

interface SectionRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  variant?: "long-form" | "short-form";
  aspectRatio?: "poster" | "landscape";
  isMicroDramaFeed?: boolean;
  className?: string;
}

export function SectionRow({
  title,
  subtitle,
  items,
  variant = "long-form",
  aspectRatio = "poster",
  isMicroDramaFeed = false,
  className,
}: SectionRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={cn("relative py-4 md:py-6 space-y-3 select-none", className)}>
      {/* Section Header */}
      <div className="px-4 md:px-12 flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {isMicroDramaFeed && (
              <span className="p-1 rounded bg-[var(--micro-drama-bg)] border border-[var(--micro-drama-accent)] text-[var(--micro-drama-accent)] font-extrabold text-xs uppercase flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current animate-pulse" /> VERTICAL SHORTS
              </span>
            )}
            <h2
              className={cn(
                "font-display font-extrabold uppercase tracking-wide text-lg md:text-2xl",
                isMicroDramaFeed
                  ? "text-[var(--foreground)] group-hover:text-[var(--micro-drama-accent)]"
                  : "text-[var(--foreground)]"
              )}
            >
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] transition-all focus:outline-none",
              canScrollLeft
                ? "hover:border-[var(--accent-main)] cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] transition-all focus:outline-none",
              canScrollRight
                ? "hover:border-[var(--accent-main)] cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Carousel Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-none px-4 md:px-12 py-2 scroll-smooth"
      >
        {items.map((item) =>
          variant === "short-form" ? (
            <ShortFormCard key={item.id} item={item} />
          ) : (
            <LongFormCard key={item.id} item={item} aspectRatio={aspectRatio} />
          )
        )}
      </div>
    </section>
  );
}
