"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HERO_CAROUSEL_ITEMS, FULL_CATALOG_ITEMS, MOCK_SHORT_FORM } from "@/data/mockMedia";
import { SectionRow } from "@/components/sections/SectionRow";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { ChevronDown } from "lucide-react";

export default function CatalogHomePage() {
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
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
        MAIN CONTENT AREA (Lifted Sheet with rounded bottom & shadow)
        As the user scrolls down, this content area slides up over 
        the fixed CinematicFooter underneath.
      */}
      <main className="relative z-10 w-full min-h-[120vh] bg-[var(--surface-base)] text-[var(--foreground)] border-b border-[var(--border)] shadow-2xl rounded-b-3xl transition-colors duration-500">
        
        {/* 1. SCROLL DOWN TO REVEAL INTRO SECTION */}
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden border-b border-[var(--border)]/50">
          
          {/* Radial Spotlight Ambient Light Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,color-mix(in_oklch,var(--accent-main)_10%,transparent)_0%,transparent_65%)] pointer-events-none" />
          <div className="footer-bg-grid absolute inset-0 opacity-40 pointer-events-none" />

          {/* Minimalist Reveal Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 max-w-3xl relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-main)]/30 text-[var(--accent-main)] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <span>DOOM OTT Streaming Experience</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em] text-[var(--foreground)] uppercase text-center font-display leading-snug">
              Scroll down to reveal
            </h1>

            <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-lg mx-auto font-sans font-medium">
              Explore 4K HDR Feature Blockbusters & 1-Minute Vertical Micro-Dramas.
            </p>
          </motion.div>

          {/* Animated Vertical Line Beam */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[1px] h-28 sm:h-36 bg-gradient-to-b from-[var(--accent-main)] to-transparent my-6 animate-pulse"
          />

          {/* Click to Scroll Button */}
          <motion.button
            onClick={scrollToCatalog}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-3 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors cursor-pointer"
            aria-label="Scroll down to catalog"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.button>
        </section>

        {/* 2. FULL HOME CATALOG CONTENT SECTION */}
        <div ref={catalogRef} className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Hero Carousel */}
          <div>
            <HeroCarousel items={HERO_CAROUSEL_ITEMS} />
          </div>

          {/* Short-Form Vertical Micro-Dramas Feed */}
          <div>
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

      {/* 3. THE CINEMATIC FOOTER (Fixed underneath main content sheet) */}
      <CinematicFooter />

    </div>
  );
}
