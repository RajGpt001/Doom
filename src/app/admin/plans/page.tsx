"use client";

import React, { useState } from "react";
import { CreditCard, Edit, Plus } from "lucide-react";

const ADMIN_PLANS = [
  { id: "basic", name: "DOOM BASIC", price: "$6.99", screens: 1, quality: "1080p Full HD", activeSubscribers: 1240 },
  { id: "standard-4k", name: "DOOM STANDARD 4K", price: "$12.99", screens: 2, quality: "4K Ultra HD", activeSubscribers: 3890 },
  { id: "premium-ultra", name: "DOOM PREMIUM ULTRA", price: "$17.99", screens: 4, quality: "4K HDR10+ / Dolby Vision", activeSubscribers: 1810 },
];

export default function AdminPlansPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Subscription Plan Management
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Configure pricing tiers, screen limitations, and streaming resolution limits.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Create New Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ADMIN_PLANS.map((p) => (
          <div key={p.id} className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">{p.name}</h3>
              <button className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)]"><Edit className="w-3.5 h-3.5 text-sky-400" /></button>
            </div>

            <div className="font-display font-black text-3xl text-[var(--foreground)]">{p.price}<span className="text-xs font-normal text-[var(--text-muted)]">/mo</span></div>

            <div className="space-y-1.5 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-3">
              <div className="flex justify-between"><span>Quality:</span><strong className="text-[var(--foreground)]">{p.quality}</strong></div>
              <div className="flex justify-between"><span>Max Screens:</span><strong className="text-[var(--foreground)]">{p.screens} Device(s)</strong></div>
              <div className="flex justify-between"><span>Active Subscribers:</span><strong className="text-[var(--accent-main)]">{p.activeSubscribers.toLocaleString()}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
