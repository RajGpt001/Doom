"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * MatteSkeleton Component
 * Strict design rule: NO glossy shimmer or gradient shiny motion.
 * Uses a subtle, flat opacity pulse on matte surface color.
 */
interface MatteSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "poster" | "short" | "text" | "box" | "circle";
}

export function MatteSkeleton({
  className,
  variant = "box",
  ...props
}: MatteSkeletonProps) {
  const variantClasses = {
    poster: "aspect-[2/3] w-full rounded-sm",
    short: "aspect-[9/16] w-full rounded-md",
    text: "h-4 w-3/4 rounded",
    box: "w-full h-full rounded",
    circle: "rounded-full w-10 h-10",
  };

  return (
    <div
      className={cn(
        "bg-[var(--surface-elevated)] border border-[var(--border)]/40 animate-pulse transition-opacity duration-300 opacity-80",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
