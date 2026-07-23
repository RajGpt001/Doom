"use client";

import React, { useState } from "react";
import { Tag, Plus } from "lucide-react";

const COUPONS = [
  { code: "DOOM2026", discount: "20% OFF", plan: "All Plans", status: "Active", uses: 412 },
  { code: "MICROSHORTS⚡", discount: "$5.00 OFF", plan: "Standard 4K", status: "Active", uses: 890 },
];

export default function CouponsPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Coupon & Discount Promo Manager
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Create promotional discount codes and track usage conversion.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Create Coupon Code
        </button>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">Promo Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Eligible Plan</th>
              <th className="py-3 px-4">Total Redemptions</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {COUPONS.map((c) => (
              <tr key={c.code} className="hover:bg-[var(--surface-base)]/50">
                <td className="py-3 px-4 font-mono font-bold text-[var(--accent-main)]">{c.code}</td>
                <td className="py-3 px-4 font-bold">{c.discount}</td>
                <td className="py-3 px-4 text-[var(--text-muted)]">{c.plan}</td>
                <td className="py-3 px-4 font-mono">{c.uses}</td>
                <td className="py-3 px-4 text-emerald-400 font-bold text-[10px] uppercase">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
