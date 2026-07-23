"use client";

import React from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HERO_CAROUSEL_ITEMS, FULL_CATALOG_ITEMS } from "@/data/mockMedia";
import { MOCK_SHORT_FORM } from "@/data/mockMedia";
import { SectionRow } from "@/components/sections/SectionRow";

export default function HomePage() {
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
    <div className="space-y-8 pb-16">
      {/* 1. Hero Carousel (Auto-rotating, pausable, manual nav) */}
      <HeroCarousel items={HERO_CAROUSEL_ITEMS} />

      {/* 2. Short-Form Vertical Micro-Dramas Feed */}
      <SectionRow
        title="Micro-Dramas & 1-Min Web Series"
        subtitle="Kinetic, bite-sized vertical episodes designed for instant 60-second binge watching."
        items={MOCK_SHORT_FORM}
        variant="short-form"
        isMicroDramaFeed={true}
      />

      {/* 3. Trending Long-Form Catalog Row */}
      <SectionRow
        title="Trending Feature Films"
        subtitle="Blockbuster cinematic experiences in 4K HDR."
        items={FULL_CATALOG_ITEMS}
        variant="long-form"
        aspectRatio="poster"
      />

      {/* 4. Continue Watching Row */}
      <SectionRow
        title="Continue Watching"
        subtitle="Resume your shows right where you left off."
        items={FULL_CATALOG_ITEMS.filter((m) => m.progressPercentage)}
        variant="long-form"
        aspectRatio="landscape"
      />

      {/* 5. Sci-Fi & Cyberpunk Row */}
      <SectionRow
        title="Sci-Fi & Cyberpunk Visions"
        subtitle="Dystopian megacities, neural grids, and temporal rifts."
        items={sciFiMovies}
        variant="long-form"
        aspectRatio="poster"
      />

      {/* 6. Action & Thrillers Row */}
      <SectionRow
        title="High-Octane Action & Thrillers"
        subtitle="Adrenaline-pumping heists and covert operatives."
        items={actionThrillers}
        variant="long-form"
        aspectRatio="landscape"
      />

      {/* 7. Dramas & Series Row */}
      <SectionRow
        title="Critically Acclaimed Dramas"
        subtitle="Intense multi-season series and political intrigue."
        items={dramas}
        variant="long-form"
        aspectRatio="poster"
      />
    </div>
  );
}
