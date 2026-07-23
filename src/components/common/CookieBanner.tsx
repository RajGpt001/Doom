"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cookieConsent !== "pending") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 p-5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl text-[var(--foreground)]"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded bg-[var(--accent-subtle)] border border-[var(--accent-main)]/30 text-[var(--accent-main)] shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm uppercase tracking-wider font-bold flex items-center gap-1.5">
                Privacy & Data Consent
              </h4>
              <button
                onClick={() => setCookieConsent("rejected")}
                className="text-[var(--text-muted)] hover:text-[var(--foreground)] p-1 rounded focus:outline-none"
                aria-label="Dismiss cookie banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Doom OTT uses essential cookies to deliver seamless video playback, save your watch history, and offer personalized recommendations. No third-party tracking.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => setCookieConsent("accepted")}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-[var(--accent-main)] text-[var(--accent-foreground)] hover:brightness-110 transition-all focus:outline-none"
              >
                Accept All Cookies
              </button>

              <button
                onClick={() => setCookieConsent("rejected")}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-[var(--surface-base)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--text-muted)] transition-colors focus:outline-none"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
