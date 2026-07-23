"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/entry/SplashScreen";
import { OnboardingSlides } from "@/components/entry/OnboardingSlides";
import { AuthTabs } from "@/components/entry/AuthTabs";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function WelcomePage() {
  const router = useRouter();
  const [stage, setStage] = useState<"splash" | "onboarding" | "auth">("splash");

  const handleSplashComplete = () => {
    setStage("onboarding");
  };

  const handleOnboardingComplete = () => {
    setStage("auth");
  };

  const handleAuthSuccess = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 select-none">
      
      {/* Background Subtle Flat Accent Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[var(--accent-main)]/10 filter blur-3xl pointer-events-none" />

      {/* Top Header Bar for Stage Navigation & Theme Toggle */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 z-20">
        <LogoPlaceholder size="md" />

        <div className="flex items-center gap-3">
          {stage !== "splash" && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium mr-2">
              <span
                onClick={() => setStage("onboarding")}
                className={`cursor-pointer hover:text-[var(--foreground)] ${stage === "onboarding" ? "text-[var(--accent-main)] font-bold" : ""}`}
              >
                1. Onboarding
              </span>
              <span>/</span>
              <span
                onClick={() => setStage("auth")}
                className={`cursor-pointer hover:text-[var(--foreground)] ${stage === "auth" ? "text-[var(--accent-main)] font-bold" : ""}`}
              >
                2. Sign In
              </span>
            </div>
          )}

          <ThemeToggle />
        </div>
      </div>

      {/* Stage Flow Container with Framer Motion AnimatePresence */}
      <div className="w-full max-w-4xl flex justify-center z-10">
        <AnimatePresence mode="wait">
          
          {stage === "splash" && (
            <SplashScreen key="splash" onComplete={handleSplashComplete} />
          )}

          {stage === "onboarding" && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <OnboardingSlides onComplete={handleOnboardingComplete} />
            </motion.div>
          )}

          {stage === "auth" && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="text-center space-y-2 mb-6">
                <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wide">
                  Welcome to Doom OTT
                </h1>
                <p className="text-xs text-[var(--text-muted)]">
                  Sign in or create your account to unlock 4K streaming and vertical micro-dramas.
                </p>
              </div>

              <AuthTabs onSuccess={handleAuthSuccess} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
