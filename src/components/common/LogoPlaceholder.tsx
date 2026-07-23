"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useAppStore } from "@/store/useAppStore";

interface LogoPlaceholderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LogoPlaceholder({
  className = "",
  size = "md",
}: LogoPlaceholderProps) {
  const { isSignedIn } = useUser();
  const { isLoggedIn: isAppLoggedIn } = useAppStore();
  const isLoggedIn = isSignedIn || isAppLoggedIn;

  const sizeClasses = {
    sm: "text-lg tracking-wider",
    md: "text-xl md:text-2xl tracking-widest",
    lg: "text-3xl md:text-4xl tracking-widest",
  };

  return (
    <Link
      href={isLoggedIn ? "/home" : "/"}
      className={`group inline-flex items-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)] rounded-sm ${className}`}
      aria-label="DOOM OTT Home"
    >
      <div className="flex items-center">
        <span
          className={`font-display font-extrabold uppercase text-[var(--foreground)] group-hover:text-[var(--accent-main)] transition-colors duration-200 ${sizeClasses[size]}`}
        >
          DOOM
        </span>
        <span
          className={`font-display font-black uppercase text-[var(--accent-main)] ml-1 bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded border border-[var(--accent-main)]/30 ${
            size === "sm"
              ? "text-xs"
              : size === "md"
              ? "text-sm"
              : "text-base"
          }`}
        >
          OTT
        </span>
      </div>
    </Link>
  );
}
