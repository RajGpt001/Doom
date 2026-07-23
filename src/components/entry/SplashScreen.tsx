"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { Zap, Film } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-base)] text-[var(--foreground)] select-none px-4"
    >
      {/* Background Subtle Accent Aura */}
      <div className="absolute w-96 h-96 rounded-full bg-[var(--accent-main)]/10 filter blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-6 text-center">
        {/* Animated Brand Icon Ring */}
        <motion.div
          initial={{ scale: 0.6, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative w-20 h-20 rounded-xl bg-[var(--surface-elevated)] border-2 border-[var(--accent-main)] flex items-center justify-center shadow-xl"
        >
          <Film className="w-9 h-9 text-[var(--accent-main)]" />
          <span className="absolute -top-1.5 -right-1.5 p-1 rounded bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)]">
            <Zap className="w-3 h-3 fill-current animate-pulse" />
          </span>
        </motion.div>

        {/* Animated Wordmark */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <LogoPlaceholder size="lg" />
          <p className="mt-2 text-xs font-display uppercase tracking-widest text-[var(--text-muted)] font-semibold">
            Cinema • Originals • Micro-Dramas ⚡
          </p>
        </motion.div>

        {/* Flat Progress Pulse Loader (No Gloss Shimmer) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 180 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
          className="h-1 rounded-full bg-[var(--accent-main)] shadow-sm"
        />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={onComplete}
          className="text-[11px] text-[var(--text-muted)] hover:text-[var(--accent-main)] underline underline-offset-4 font-medium transition-colors"
        >
          Tap to skip intro →
        </motion.button>
      </div>
    </motion.div>
  );
}
