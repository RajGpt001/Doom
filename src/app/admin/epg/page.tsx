"use client";

import React from "react";
import { Calendar, Plus, Clock } from "lucide-react";

const EPG_SLOTS = [
  { time: "00:00 - 02:00", channel: "DOOM Cinema 4K", show: "Cybernetic Void", rating: "18+" },
  { time: "02:00 - 04:00", channel: "DOOM Cinema 4K", show: "Dark Matter Chronicles", rating: "16+" },
  { time: "04:00 - 06:00", channel: "DOOM Short-Form Live ⚡", show: "100 Seconds of Betrayal (Ep 1-10)", rating: "16+" },
  { time: "06:00 - 08:00", channel: "DOOM Sci-Fi Channel", show: "Quantum Horizon", rating: "13+" },
];

export default function EPGPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            EPG Electronic Program Guide Scheduling
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Schedule broadcast timelines and XMLTV program guide data.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Schedule Broadcast Slot
        </button>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">Time Slot</th>
              <th className="py-3 px-4">Channel</th>
              <th className="py-3 px-4">Program / Episode</th>
              <th className="py-3 px-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {EPG_SLOTS.map((slot, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-base)]/50">
                <td className="py-3 px-4 font-mono text-[var(--accent-main)] font-bold">{slot.time}</td>
                <td className="py-3 px-4 font-semibold">{slot.channel}</td>
                <td className="py-3 px-4">{slot.show}</td>
                <td className="py-3 px-4 font-bold">{slot.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
