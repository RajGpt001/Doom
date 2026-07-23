"use client";

import React from "react";
import { BarChart3, TrendingUp, DollarSign, Download } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const PLAN_SHARE = [
  { name: "Doom Basic", value: 1240, color: "#94a3b8" },
  { name: "Standard 4K", value: 3890, color: "var(--accent-main)" },
  { name: "Premium Ultra", value: 1810, color: "var(--micro-drama-accent)" },
];

const CONTENT_ENGAGEMENT = [
  { genre: "Cyberpunk", watchHours: 42000 },
  { genre: "Sci-Fi", watchHours: 38000 },
  { genre: "Micro-Dramas ⚡", watchHours: 64000 },
  { genre: "Suspense", watchHours: 29000 },
  { genre: "Horror", watchHours: 19000 },
];

export default function ReportsAnalyticsPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Reports & Revenue Analytics
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Detailed breakdown of subscription tiers, engagement watch-hours, and ARPU metrics.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-bold uppercase text-[var(--foreground)] hover:border-[var(--accent-main)] cursor-pointer">
          <Download className="w-4 h-4" /> Export Financial PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subscription Plan Distribution Pie Chart */}
        <div className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
          <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)]">
            Subscriber Tier Distribution
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLAN_SHARE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {PLAN_SHARE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "var(--surface-base)", borderColor: "var(--border)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Watch Hours Bar Chart */}
        <div className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
          <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)]">
            Watch Hours by Genre
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONTENT_ENGAGEMENT}>
                <XAxis dataKey="genre" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "var(--surface-base)", borderColor: "var(--border)" }} />
                <Bar dataKey="watchHours" fill="var(--accent-main)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
