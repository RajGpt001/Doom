"use client";

import React from "react";
import { Image as ImageIcon, Plus, ArrowUp, ArrowDown } from "lucide-react";

const BANNERS = [
  { id: "b1", title: "Proprietors of Chaos S3", order: 1, type: "Hero Carousel", status: "Active" },
  { id: "b2", title: "Cybernetic Void 4K Premiere", order: 2, type: "Hero Carousel", status: "Active" },
  { id: "b3", title: "100 Seconds of Betrayal (Micro-Series)", order: 3, type: "Shorts Banner ⚡", status: "Active" },
];

export default function BannersPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Hero Banner & Slider Management
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Control homepage hero carousel order and promotional spotlight banners.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Add Hero Banner
        </button>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Title / Media</th>
              <th className="py-3 px-4">Placement</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Reorder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {BANNERS.map((b) => (
              <tr key={b.id} className="hover:bg-[var(--surface-base)]/50">
                <td className="py-3 px-4 font-mono font-bold text-[var(--accent-main)]">#{b.order}</td>
                <td className="py-3 px-4 font-bold">{b.title}</td>
                <td className="py-3 px-4 text-[var(--text-muted)]">{b.type}</td>
                <td className="py-3 px-4 text-emerald-400 font-bold text-[10px] uppercase">{b.status}</td>
                <td className="py-3 px-4 text-right space-x-1">
                  <button className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)]"><ArrowUp className="w-3.5 h-3.5" /></button>
                  <button className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)]"><ArrowDown className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
