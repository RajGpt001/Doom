"use client";

import React from "react";
import { Star, MessageSquare, Film } from "lucide-react";

const MY_REVIEWS = [
  { id: "r1", title: "CYBERNETIC VOID", rating: 5, date: "2026-07-20", comment: "Masterpiece in dark cyberpunk world-building. The neural grid sound design is incredible." },
  { id: "r2", title: "100 SECONDS OF BETRAYAL", rating: 5, date: "2026-07-18", comment: "Perfect 1-minute chapter format! Keeps you hooked every single episode." },
  { id: "r3", title: "DARK MATTER CHRONICLES", rating: 4, date: "2026-06-15", comment: "Great black hole event horizon mechanics. Ending was mind-bending." },
];

export default function ReviewsHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 select-none">
      
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wider flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[var(--accent-main)]" />
          My Ratings & Review History
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Manage ratings and comments submitted across Doom OTT titles.
        </p>
      </div>

      <div className="space-y-4">
        {MY_REVIEWS.map((r) => (
          <div key={r.id} className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm uppercase text-[var(--foreground)] flex items-center gap-2">
                <Film className="w-4 h-4 text-[var(--accent-main)]" />
                {r.title}
              </h3>
              <span className="text-[10px] text-[var(--text-muted)]">{r.date}</span>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3.5 h-3.5 ${
                    idx < r.rating
                      ? "text-amber-400 fill-current"
                      : "text-[var(--border)]"
                  }`}
                />
              ))}
              <span className="text-xs font-bold text-[var(--foreground)] ml-1">{r.rating} / 5</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
              "{r.comment}"
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
