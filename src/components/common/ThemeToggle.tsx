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
    // Render skeleton box during hydration to avoid page flash
    return (
      <div className="w-16 h-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-16 h-8 p-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)] cursor-pointer"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent-main)] text-[var(--accent-foreground)] shadow-sm"
        animate={{
          x: isDark ? 0 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="w-3.5 h-3.5 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sun className="w-3.5 h-3.5 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Icons Indicators */}
      <span className="absolute left-2.5 text-[var(--text-muted)] pointer-events-none text-[10px]">
        {isDark && <Moon className="w-3 h-3 opacity-40" />}
      </span>
      <span className="absolute right-2.5 text-[var(--text-muted)] pointer-events-none text-[10px]">
        {!isDark && <Sun className="w-3 h-3 opacity-40" />}
      </span>
    </button>
  );
}
