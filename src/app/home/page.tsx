"use client";

import React, { useRef } from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HERO_CAROUSEL_ITEMS, FULL_CATALOG_ITEMS, MOCK_SHORT_FORM } from "@/data/mockMedia";
import { SectionRow } from "@/components/sections/SectionRow";
import { CinematicFooter, MagneticButton } from "@/components/ui/motion-footer";
import { RadialIntroOverlay } from "@/components/ui/radial-intro";
import { Play, Zap, ChevronDown } from "lucide-react";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>CINEMATIC 4K HDR STREAMING</span> <span className="text-[var(--primary)]">✦</span>
    <span>1-MINUTE MICRO-DRAMAS</span> <span className="text-[var(--primary)]">✦</span>
    <span>EXCLUSIVE ORIGINAL SERIES</span> <span className="text-[var(--primary)]">✦</span>
    <span>DOLBY ATMOS AUDIO</span> <span className="text-[var(--primary)]">✦</span>
    <span>UNLIMITED WATCHING</span> <span className="text-[var(--primary)]">✦</span>
  </div>
);

export default function CatalogHomePage() {
  const trendingRef = useRef<HTMLDivElement>(null);
  const microDramasRef = useRef<HTMLDivElement>(null);

  const scrollToTrending = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMicroDramas = () => {
    microDramasRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-[var(--background)] min-h-screen font-sans selection:bg-[var(--primary)] selection:text-white overflow-x-hidden select-none">
      
      {/* 3D Orbital Intro Overlay (Plays once per session, skippable) */}
      <RadialIntroOverlay />

      {/* Main Content Viewport Sheet */}
      <main className="relative z-10 w-full min-h-screen bg-[var(--background)] text-[var(--text-primary)] border-b border-[var(--border)] shadow-2xl transition-colors duration-300">
        
        {/* 🌟 1. TOP HERO BANNER & MARQUEE */}
        <section className="relative w-full">
          <HeroCarousel items={HERO_CAROUSEL_ITEMS} />

          {/* Marquee Ticker Strip (Single Seamless Loop) */}
          <div className="w-full overflow-hidden border-y border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md py-3.5 shadow-xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs font-bold tracking-[0.3em] text-[var(--text-secondary)] uppercase font-heading">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>
        </section>

        {/* 🎬 2. CLEAN & MERGED CATALOG ROWS */}
        <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Vertical Micro-Dramas & 1-Min Web Series Shelf */}
          <div ref={microDramasRef}>
            <SectionRow
              title="Micro-Dramas & 1-Min Web Series ⚡"
              subtitle="Kinetic, bite-sized vertical episodes designed for instant 60-second binge watching."
              items={MOCK_SHORT_FORM}
              variant="short-form"
              isMicroDramaFeed={true}
            />
          </div>

          {/* Single Merged "Trending Now" Long-Form Catalog Shelf */}
          <div ref={trendingRef}>
            <SectionRow
              title="Trending Now"
              subtitle="Blockbuster feature films & exclusive original series in 4K HDR."
              items={FULL_CATALOG_ITEMS}
              variant="long-form"
              aspectRatio="poster"
            />
          </div>

        </div>

      </main>

      {/* 3. SIMPLIFIED CINEMATIC FOOTER (Single sitemap sytem underneath) */}
      <CinematicFooter />

    </div>
  );
}
