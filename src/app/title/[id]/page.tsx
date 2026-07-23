"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Plus,
  Check,
  Star,
  Film,
  Tv,
  Users,
  ChevronLeft,
  Layers,
  Sparkles,
  Share2,
  Clock,
} from "lucide-react";
import { FULL_CATALOG_ITEMS, ExtendedMediaItem } from "@/data/mockMedia";
import { SectionRow } from "@/components/sections/SectionRow";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export default function TitleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useAppStore();

  const item = FULL_CATALOG_ITEMS.find((m) => m.id === id) || FULL_CATALOG_ITEMS[0];
  const isBookmarked = isInWatchlist(item.id);

  // Related titles in same genre
  const relatedTitles = FULL_CATALOG_ITEMS.filter(
    (m) => m.id !== item.id && m.genre.some((g) => item.genre.includes(g))
  );

  return (
    <div className="space-y-10 pb-16 select-none">
      
      {/* Top Back Navigation Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Catalog
        </button>
      </div>

      {/* Hero Backdrop Section */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-end px-4 md:px-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {isPlayingVideo && item.videoUrl ? (
            <video
              src={item.videoUrl}
              autoPlay
              controls
              onEnded={() => setIsPlayingVideo(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={item.bannerUrl || item.posterUrl}
              alt={item.title}
              className="w-full h-full object-cover object-center filter grayscale-[15%] brightness-75 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-3/4 md:w-1/2 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Hero Title Info */}
        <div className="relative z-20 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {item.badge && (
              <span className="px-2.5 py-1 text-xs font-black uppercase tracking-widest bg-[var(--accent-main)] text-[var(--accent-foreground)] rounded-sm">
                {item.badge}
              </span>
            )}
            <span className="px-2.5 py-1 text-xs font-bold text-[var(--foreground)] bg-[var(--surface-elevated)] border border-[var(--border)] rounded-sm flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> {item.reviewsRating || 4.8} / 5 ({item.reviewsCount || 1200} Reviews)
            </span>
          </div>

          <h1 className="font-display font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-wider text-[var(--foreground)] leading-none">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-muted)]">
            <span className="text-[var(--accent-main)]">{item.year}</span>
            <span>•</span>
            <span className="border border-[var(--border)] px-1.5 py-0.5 rounded text-xs">
              {item.rating}
            </span>
            <span>•</span>
            <span>{item.type === "series" ? `${item.seasonCount} Seasons` : item.duration}</span>
            <span>•</span>
            <span>{item.language || "English"}</span>
            <span>•</span>
            <span className="text-[var(--foreground)]">{item.genre.join(" / ")}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsPlayingVideo(!isPlayingVideo)}
              className="flex items-center gap-2 px-6 py-3.5 bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all cursor-pointer shadow-xl"
            >
              <Play className="w-4 h-4 fill-current" />
              {isPlayingVideo ? "Close Video" : item.type === "series" ? "Start Episode 1" : "Play Feature Film"}
            </button>

            <button
              onClick={() => toggleWatchlist(item.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3.5 font-display font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm border transition-all cursor-pointer",
                isBookmarked
                  ? "bg-[var(--accent-main)]/20 border-[var(--accent-main)] text-[var(--accent-main)]"
                  : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)]"
              )}
            >
              {isBookmarked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isBookmarked ? "In My List" : "Add to My List"}
            </button>
          </div>
        </div>
      </section>

      {/* Main Details Body (Synopsis, Cast, Episodes) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Synopsis & Episodes */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--foreground)] border-b border-[var(--border)] pb-2">
              Synopsis & Overview
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Series Episode Selector (If Series) */}
          {item.type === "series" && (
            <div className="space-y-4 p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--accent-main)]" />
                  Episodes Guide
                </h3>

                {/* Season Dropdown */}
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] font-bold rounded px-3 py-1 focus:outline-none"
                >
                  {Array.from({ length: item.seasonCount || 1 }).map((_, i) => (
                    <option key={i} value={i + 1}>
                      Season {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Episode List */}
              <div className="space-y-3">
                {(item.episodes || [
                  { id: "e1", number: 1, title: "Pilot: Neural Drift", duration: "52m", thumbnail: item.posterUrl, overview: "An operative investigates a corrupted AI database." },
                  { id: "e2", number: 2, title: "Signal Inversion", duration: "49m", thumbnail: item.bannerUrl || item.posterUrl, overview: "The team escapes a mercenary ambush in Sector 7." },
                ]).map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => setIsPlayingVideo(true)}
                    className="group flex items-start gap-4 p-3 rounded bg-[var(--surface-base)] border border-[var(--border)] hover:border-[var(--accent-main)] cursor-pointer transition-all"
                  >
                    <div className="relative w-28 aspect-[16/9] rounded overflow-hidden shrink-0 bg-black">
                      <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-[var(--accent-main)] fill-current" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
                        <span>{ep.number}. {ep.title}</span>
                        <span className="text-[var(--text-muted)] text-[11px] font-normal flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ep.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                        {ep.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cast & Crew Section */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
              <Users className="w-4 h-4 text-[var(--accent-main)]" />
              Featured Cast & Crew
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(item.cast || [
                { name: "Kaelen Voss", role: "Protagonist", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
                { name: "Sora Takahashi", role: "Lead Engineer", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
                { name: "Elena Kovic", role: "Director", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
              ]).map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                  <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-[var(--border)]" />
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-[var(--foreground)] truncate">{c.name}</h5>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Metadata Card */}
        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)] border-b border-[var(--border)] pb-2">
              Production Specifications
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Director:</span>
                <span className="font-semibold text-[var(--foreground)]">{item.director || "Elena Kovic"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Audio Output:</span>
                <span className="font-semibold text-[var(--foreground)]">Dolby Atmos / 5.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Video Fidelity:</span>
                <span className="font-semibold text-[var(--accent-main)]">4K Ultra HD (HDR10+)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Subtitles:</span>
                <span className="font-semibold text-[var(--foreground)]">EN, ES, JA, KO, FR</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Related Titles Carousel Row */}
      {relatedTitles.length > 0 && (
        <SectionRow
          title="More Like This"
          subtitle="Titles sharing similar genres and atmospheric themes."
          items={relatedTitles}
          variant="long-form"
          aspectRatio="poster"
        />
      )}

    </div>
  );
}
