"use client";

import React, { useState } from "react";
import { Radio, Plus, Activity, Power, Video } from "lucide-react";

const CHANNELS = [
  { id: "ch1", name: "DOOM Cinema 4K", streamUrl: "rtmp://live.doomott.com/cinema4k", status: "Active", viewers: 4210 },
  { id: "ch2", name: "DOOM Short-Form Live ⚡", streamUrl: "rtmp://live.doomott.com/shorts", status: "Active", viewers: 8900 },
  { id: "ch3", name: "DOOM Sci-Fi Channel", streamUrl: "rtmp://live.doomott.com/scifi", status: "Active", viewers: 1840 },
  { id: "ch4", name: "DOOM Retro Action", streamUrl: "rtmp://live.doomott.com/retro", status: "Offline", viewers: 0 },
];

export default function LiveChannelsPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Live Channel & IPTV Management
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Configure RTMP/HLS live video ingest streams and channel status.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Add Channel Stream
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHANNELS.map((ch) => (
          <div key={ch.id} className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[var(--accent-main)]" />
                <span className="font-display font-bold text-sm text-[var(--foreground)]">{ch.name}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${ch.status === "Active" ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40" : "bg-red-950/60 text-red-400 border-red-800/40"}`}>
                {ch.status}
              </span>
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--surface-base)] p-2 rounded border border-[var(--border)] truncate">
              {ch.streamUrl}
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-1">
              <span>Concurrent Viewers: <strong className="text-[var(--foreground)]">{ch.viewers.toLocaleString()}</strong></span>
              <button className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)] hover:border-red-500 text-xs flex items-center gap-1">
                <Power className="w-3.5 h-3.5" /> Toggle Stream
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
