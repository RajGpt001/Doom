"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HERO_CAROUSEL_ITEMS, FULL_CATALOG_ITEMS, MOCK_SHORT_FORM } from "@/data/mockMedia";
import { SectionRow } from "@/components/sections/SectionRow";
import { CinematicFooter, MagneticButton } from "@/components/ui/motion-footer";
import { ChevronDown, Play, Zap } from "lucide-react";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>CINEMATIC 4K HDR STREAMING</span> <span className="text-[var(--accent-main)]">✦</span>
    <span>1-MINUTE MICRO-DRAMAS</span> <span className="text-[var(--micro-drama-accent)]">✦</span>
    <span>EXCLUSIVE ORIGINAL SERIES</span> <span className="text-[var(--accent-main)]">✦</span>
    <span>DOLBY ATMOS AUDIO</span> <span className="text-[var(--micro-drama-accent)]">✦</span>
    <span>UNLIMITED WATCHING</span> <span className="text-[var(--accent-main)]">✦</span>
  </div>
);

export default function CatalogHomePage() {
  const catalogRef = useRef<HTMLDivElement>(null);
  const microDramasRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMicroDramas = () => {
    microDramasRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sciFiMovies = FULL_CATALOG_ITEMS.filter((item) =>
    item.genre.includes("Sci-Fi") || item.genre.includes("Cyberpunk")
  );

  const actionThrillers = FULL_CATALOG_ITEMS.filter((item) =>
    item.genre.includes("Action") || item.genre.includes("Thriller")
  );

  const dramas = FULL_CATALOG_ITEMS.filter((item) =>
    item.genre.includes("Drama") || item.genre.includes("Political Thriller")
  );

  return (
    <div className="relative w-full bg-[var(--surface-base)] min-h-screen font-sans selection:bg-white/20 overflow-x-hidden select-none">
      
      {/* 
        MAIN CONTENT SHEET
        Contains the Top Hero "READY TO BINGE?" Banner + Full Media Catalog
      */}
      <main className="relative z-10 w-full min-h-screen bg-[var(--surface-base)] text-[var(--foreground)] border-b border-[var(--border)] shadow-2xl rounded-b-3xl transition-colors duration-500">
        
        {/* 🌟 1. TOP HERO INTRO BANNER (EXACT LANDING SCREEN AFTER LOGIN/GUEST) */}
        <section className="relative min-h-[90vh] flex flex-col justify-between items-center px-4 pt-20 pb-12 text-center overflow-hidden border-b border-[var(--border)] cinematic-footer-wrapper">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text mask */}
          <div className="footer-giant-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-display font-black">
            DOOM OTT
          </div>

          {/* Diagonal Sleek Marquee (Top of Hero Section) */}
          <div className="w-full overflow-hidden border-y border-[var(--border)] bg-[var(--surface-base)]/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-xl my-4">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[var(--text-muted)] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main Center Content */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8 max-w-5xl mx-auto space-y-8">
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl sm:text-8xl md:text-9xl font-black footer-text-glow tracking-tighter text-center font-display uppercase leading-none"
            >
              Ready To Binge?
            </motion.h1>

            {/* Interactive Magnetic Glass Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full pt-4"
            >
              <MagneticButton
                as="button"
                onClick={scrollToMicroDramas}
                className="footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[var(--foreground)] font-bold text-sm sm:text-base flex items-center gap-3 group border border-[var(--border)]"
              >
                <Zap className="w-5 h-5 text-[var(--micro-drama-accent)] fill-current group-hover:scale-110 transition-transform" />
                <span>Watch Micro-Dramas</span>
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={scrollToCatalog}
                className="footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[var(--foreground)] font-bold text-sm sm:text-base flex items-center gap-3 group border border-[var(--border)]"
              >
                <Play className="w-5 h-5 text-[var(--accent-main)] fill-current group-hover:scale-110 transition-transform" />
                <span>Explore 4K Catalog</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Animated Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 flex flex-col items-center gap-2 cursor-pointer pt-4"
            onClick={scrollToCatalog}
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--text-muted)] font-display">
              Scroll Down to Explore
            </span>
            <div className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </motion.div>

        </section>

        {/* 🎬 2. FULL HOME CATALOG SECTIONS (Revealed Below the Top Intro) */}
        <div ref={catalogRef} className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Hero Carousel */}
          <div>
            <HeroCarousel items={HERO_CAROUSEL_ITEMS} />
          </div>

          {/* Short-Form Vertical Micro-Dramas Feed */}
          <div ref={microDramasRef}>
            <SectionRow
              title="Micro-Dramas & 1-Min Web Series ⚡"
              subtitle="Kinetic, bite-sized vertical episodes designed for instant 60-second binge watching."
              items={MOCK_SHORT_FORM}
              variant="short-form"
              isMicroDramaFeed={true}
            />
          </div>

          {/* Trending Long-Form Catalog Row */}
          <div>
            <SectionRow
              title="Trending Feature Films"
              subtitle="Blockbuster cinematic experiences in 4K HDR."
              items={FULL_CATALOG_ITEMS}
              variant="long-form"
              aspectRatio="poster"
            />
          </div>

          {/* Continue Watching Row */}
          <div>
            <SectionRow
              title="Continue Watching"
              subtitle="Resume your shows right where you left off."
              items={FULL_CATALOG_ITEMS.filter((m) => m.progressPercentage)}
              variant="long-form"
              aspectRatio="landscape"
            />
          </div>

          {/* Sci-Fi & Cyberpunk Row */}
          <div>
            <SectionRow
              title="Sci-Fi & Cyberpunk Visions"
              subtitle="Dystopian megacities, neural grids, and temporal rifts."
              items={sciFiMovies}
              variant="long-form"
              aspectRatio="poster"
            />
          </div>

          {/* Action & Thrillers Row */}
          <div>
            <SectionRow
              title="High-Octane Action & Thrillers"
              subtitle="Adrenaline-pumping heists and covert operatives."
              items={actionThrillers}
              variant="long-form"
              aspectRatio="landscape"
            />
          </div>

          {/* Dramas & Series Row */}
          <div>
            <SectionRow
              title="Critically Acclaimed Dramas"
              subtitle="Intense multi-season series and political intrigue."
              items={dramas}
              variant="long-form"
              aspectRatio="poster"
            />
          </div>
        </div>

      </main>

      {/* 3. CINEMATIC FOOTER (Curtain Reveal Underneath) */}
      <CinematicFooter />

    </div>
  );
}
