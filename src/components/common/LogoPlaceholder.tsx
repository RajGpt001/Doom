"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";

interface LogoPlaceholderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LogoPlaceholder({
  className = "",
  size = "md",
}: LogoPlaceholderProps) {
  const { isLoggedIn } = useAppStore();

  const heightClasses = {
    sm: "h-6 sm:h-7",
    md: "h-8 sm:h-9",
    lg: "h-14 sm:h-16",
  };

  return (
    <Link
      href={isLoggedIn ? "/home" : "/"}
      className={`group inline-flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md ${className}`}
      aria-label="DOOM OTT Home"
    >
      <img
        src="/logo.jpeg"
        alt="DOOM OTT Logo"
        className={`${heightClasses[size]} w-auto object-contain rounded-sm group-hover:opacity-90 transition-opacity duration-200`}
        loading="eager"
      />
    </Link>
  );
}
