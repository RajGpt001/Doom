"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HERO_CAROUSEL_ITEMS, FULL_CATALOG_ITEMS } from "@/data/mockMedia";
import { MOCK_SHORT_FORM } from "@/data/mockMedia";
import { SectionRow } from "@/components/sections/SectionRow";

// Cinematic Entrance Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const heroSpotlightVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(12px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CatalogHomePage() {
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
    <div className="relative overflow-hidden select-none">
      
      {/* 🎬 Cinematic Shutter Beam Overlay Animation */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
        className="fixed inset-0 bg-[var(--surface-base)] origin-top z-50 pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 1, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-display font-black text-2xl uppercase tracking-widest text-[var(--accent-main)]"
        >
          DOOM OTT
        </motion.div>
      </motion.div>

      {/* Main Catalog View Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8 pb-16"
      >
        {/* 1. Hero Carousel (Spotlight Reveal) */}
        <motion.div variants={heroSpotlightVariants}>
          <HeroCarousel items={HERO_CAROUSEL_ITEMS} />
        </motion.div>

        {/* 2. Short-Form Vertical Micro-Dramas Feed */}
        <motion.div variants={rowVariants}>
          <SectionRow
            title="Micro-Dramas & 1-Min Web Series ⚡"
            subtitle="Kinetic, bite-sized vertical episodes designed for instant 60-second binge watching."
            items={MOCK_SHORT_FORM}
            variant="short-form"
            isMicroDramaFeed={true}
          />
        </motion.div>

        {/* 3. Trending Long-Form Catalog Row */}
        <motion.div variants={rowVariants}>
          <SectionRow
            title="Trending Feature Films"
            subtitle="Blockbuster cinematic experiences in 4K HDR."
            items={FULL_CATALOG_ITEMS}
            variant="long-form"
            aspectRatio="poster"
          />
        </motion.div>

        {/* 4. Continue Watching Row */}
        <motion.div variants={rowVariants}>
          <SectionRow
            title="Continue Watching"
            subtitle="Resume your shows right where you left off."
            items={FULL_CATALOG_ITEMS.filter((m) => m.progressPercentage)}
            variant="long-form"
            aspectRatio="landscape"
          />
        </motion.div>

        {/* 5. Sci-Fi & Cyberpunk Row */}
        <motion.div variants={rowVariants}>
          <SectionRow
            title="Sci-Fi & Cyberpunk Visions"
            subtitle="Dystopian megacities, neural grids, and temporal rifts."
            items={sciFiMovies}
            variant="long-form"
            aspectRatio="poster"
          />
        </motion.div>

        {/* 6. Action & Thrillers Row */}
        <motion.div variants={rowVariants}>
          <SectionRow
            title="High-Octane Action & Thrillers"
            subtitle="Adrenaline-pumping heists and covert operatives."
            items={actionThrillers}
            variant="long-form"
            aspectRatio="landscape"
          />
        </motion.div>

        {/* 7. Dramas & Series Row */}
        <motion.div variants={rowVariants}>
          <SectionRow
            title="Critically Acclaimed Dramas"
            subtitle="Intense multi-season series and political intrigue."
            items={dramas}
            variant="long-form"
            aspectRatio="poster"
          />
        </motion.div>
      </motion.div>

    </div>
  );
}
