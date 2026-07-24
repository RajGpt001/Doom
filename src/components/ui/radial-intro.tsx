"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroAnimation from "./scroll-morph-hero";
import { useAppStore } from "@/store/useAppStore";

export function RadialIntroOverlay() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isLoggedIn } = useAppStore();

  useEffect(() => {
    // Only check on client-side mount
    const hasSeen = sessionStorage.getItem("hasSeenIntro") === "true";
    
    // Show only if not logged in AND has not seen intro in current session
    if (!isLoggedIn && !hasSeen) {
      setIsVisible(true);
    }
  }, [isLoggedIn]);

  const handleComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.6, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 w-screen h-screen bg-[#0A0A0A]"
      >
        <IntroAnimation onComplete={handleComplete} />
      </motion.div>
    </AnimatePresence>
  );
}
