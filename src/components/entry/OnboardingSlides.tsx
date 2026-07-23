"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Zap, Users, ChevronRight, ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingSlidesProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    id: "slide-1",
    title: "Cinematic Long-Form Catalog",
    subtitle: "Stream 4K Ultra HD feature films, blockbuster thrillers, and exclusive Doom Original series.",
    icon: Film,
    accentClass: "text-[var(--accent-main)] border-[var(--accent-main)] bg-[var(--accent-subtle)]",
    bgTag: "4K HDR & SURROUND SOUND",
    previewCard: {
      title: "CYBERNETIC VOID",
      badge: "DOOM ORIGINAL",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "slide-2",
    title: "Micro-Dramas & 1-Min Shorts ⚡",
    subtitle: "High-voltage 9:16 vertical series designed for instant 60-second binge watching on the go.",
    icon: Zap,
    accentClass: "text-[var(--micro-drama-accent)] border-[var(--micro-drama-accent)] bg-[var(--micro-drama-bg)]",
    bgTag: "VERTICAL 9:16 EPISODES",
    previewCard: {
      title: "100 SECONDS OF BETRAYAL",
      badge: "EP 01 • 1 MIN",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      isVertical: true,
    },
  },
  {
    id: "slide-3",
    title: "Multi-Profiles & Personal Watchlist",
    subtitle: "Separate user profiles for family members, PIN protection, and synchronized watch history.",
    icon: Users,
    accentClass: "text-[var(--accent-main)] border-[var(--accent-main)] bg-[var(--accent-subtle)]",
    bgTag: "UP TO 5 PROFILES",
    previewCard: {
      title: "ALEX'S PROFILE",
      badge: "PREMIUM ACTIVE",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
  },
];

export function OnboardingSlides({ onComplete }: OnboardingSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[550px] flex flex-col justify-between p-6 sm:p-10 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl select-none">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between z-10">
        <span className={cn("px-2.5 py-1 text-[11px] font-black uppercase tracking-widest border rounded", slide.accentClass)}>
          {slide.bgTag}
        </span>

        <button
          onClick={onComplete}
          className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded hover:bg-[var(--surface-base)] focus:outline-none"
        >
          Skip Intro →
        </button>
      </div>

      {/* Slide Content Transition Container */}
      <div className="relative my-8 flex-1 flex flex-col md:flex-row items-center gap-8 z-10 overflow-hidden">
        
        {/* Left Text Column */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 space-y-4 text-left"
          >
            <div className={cn("w-12 h-12 rounded-md border flex items-center justify-center", slide.accentClass)}>
              <Icon className="w-6 h-6 fill-current" />
            </div>

            <h2 className="font-display font-black uppercase text-2xl sm:text-4xl tracking-wide text-[var(--foreground)] leading-tight">
              {slide.title}
            </h2>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
              {slide.subtitle}
            </p>

            <div className="space-y-2 pt-2 text-xs font-medium text-[var(--foreground)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-main)]" />
                <span>Matte, distraction-free playback experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-main)]" />
                <span>Instant playback across Web, Mobile & TV</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Visual Card Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-card"}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full md:w-72 flex justify-center"
          >
            <div
              className={cn(
                "relative rounded-lg overflow-hidden bg-[var(--surface-base)] border-2 shadow-2xl p-2",
                slide.previewCard.isVertical ? "w-44 aspect-[9/16]" : "w-64 aspect-[16/10]",
                slide.accentClass
              )}
            >
              <img
                src={slide.previewCard.image}
                alt={slide.previewCard.title}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--accent-main)]">
                  {slide.previewCard.badge}
                </span>
                <h4 className="font-display font-bold text-xs uppercase text-white truncate">
                  {slide.previewCard.title}
                </h4>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] z-10">
        
        {/* Indicator Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === currentSlide
                  ? "w-8 bg-[var(--accent-main)]"
                  : "w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="p-2.5 rounded bg-[var(--surface-base)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--text-muted)] transition-colors focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md focus:outline-none cursor-pointer"
          >
            <span>{currentSlide === SLIDES.length - 1 ? "Get Started" : "Continue"}</span>
            {currentSlide === SLIDES.length - 1 ? (
              <ArrowRight className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
