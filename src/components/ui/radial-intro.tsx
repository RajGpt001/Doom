"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroAnimation from "./scroll-morph-hero";

export function RadialIntroOverlay() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleComplete = () => {
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
