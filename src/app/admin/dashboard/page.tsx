"use client";

import React from "react";
import {
  Users,
  Film,
  DollarSign,
  Zap,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Radio,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, subscribers: 1200 },
  { month: "Feb", revenue: 58000, subscribers: 1850 },
  { month: "Mar", revenue: 74000, subscribers: 2400 },
  { month: "Apr", revenue: 89000, subscribers: 3100 },
  { month: "May", revenue: 112000, subscribers: 4200 },
  { month: "Jun", revenue: 138000, subscribers: 5600 },
  { month: "Jul", revenue: 165000, subscribers: 6900 },
];

const METRICS = [
  { title: "TOTAL SUBSCRIBERS", value: "6,940", change: "+18.4%", icon: Users },
  { title: "MONTHLY REVENUE", value: "$165,240", change: "+24.1%", icon: DollarSign },
  { title: "TOTAL MEDIA TITLES", value: "342", change: "+12 New", icon: Film },
  { title: "MICRO-SERIES VIEWS ⚡", value: "1.42M", change: "+45.2%", icon: Zap },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Dashboard & Realtime Analytics
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            System health, active streams, revenue trends, and platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>All Nodes Operational (99.98% Uptime)</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-bold">
                <span>{m.title}</span>
                <Icon className="w-4 h-4 text-[var(--accent-main)]" />
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-display font-black text-2xl text-[var(--foreground)]">{m.value}</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  {m.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Growth Area Chart */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent-main)]" />
              Monthly Revenue Trajectory ($ USD)
            </h3>
            <span className="text-[10px] text-[var(--text-muted)]">2026 YTD</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--surface-base)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent-main)" fill="var(--accent-subtle)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscriber Growth Bar Chart */}
        <div className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
          <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)]">
            Subscriber Growth
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--surface-base)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
                <Bar dataKey="subscribers" fill="var(--micro-drama-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
