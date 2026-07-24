"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-14 h-7 p-0.5 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer"
      style={{
        background: isDark ? "#1C1C1C" : "#F0EBE5",
        borderColor: isDark ? "#2A2A2A" : "#D6D0C8",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track background icons */}
      <span className="absolute left-1.5 pointer-events-none">
        <Moon className="w-3 h-3" style={{ color: isDark ? "#E50914" : "#bbb", opacity: isDark ? 0.8 : 0.3 }} />
      </span>
      <span className="absolute right-1.5 pointer-events-none">
        <Sun className="w-3 h-3" style={{ color: !isDark ? "#C8000A" : "#555", opacity: !isDark ? 0.9 : 0.3 }} />
      </span>

      {/* Sliding Pill */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md"
        style={{ background: "var(--primary)" }}
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="w-3.5 h-3.5 text-white fill-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <Sun className="w-3.5 h-3.5 text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
