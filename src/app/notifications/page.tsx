"use client";

import React, { useState } from "react";
import { Bell, Check, Film, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { id: "n1", title: "New Season Released", desc: "Proprietors of Chaos Season 3 is now streaming in 4K HDR.", time: "2 hours ago", isNew: true, icon: Film },
  { id: "n2", title: "New Micro-Drama Episode", desc: "100 Seconds of Betrayal Chapter 8 finale is live ⚡", time: "1 day ago", isNew: true, icon: Zap },
  { id: "n3", title: "Billing Renewal Notice", desc: "Your Doom Standard 4K plan renewed successfully for $12.99.", time: "3 days ago", isNew: false, icon: Bell },
];

export default function NotificationsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      <div className="border-b border-[var(--border)] pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wider flex items-center gap-2">
            <Bell className="w-6 h-6 text-[var(--accent-main)]" />
            Notifications & Activity Alerts
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Stay updated on new releases, episode drops, and account alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Notification Feed */}
        <div className="md:col-span-2 space-y-3">
          {NOTIFICATIONS.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={cn(
                  "p-4 rounded-lg bg-[var(--surface-elevated)] border flex items-start gap-3 transition-colors",
                  n.isNew ? "border-[var(--accent-main)]/60" : "border-[var(--border)]"
                )}
              >
                <div className="p-2 rounded bg-[var(--accent-subtle)] border border-[var(--accent-main)]/30 text-[var(--accent-main)] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{n.time}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{n.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Preferences */}
        <div className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 h-fit">
          <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5 border-b border-[var(--border)] pb-2">
            <Settings className="w-3.5 h-3.5 text-[var(--accent-main)]" />
            Alert Preferences
          </h4>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[var(--foreground)] font-medium">Email Digest</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="accent-[var(--accent-main)]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[var(--foreground)] font-medium">Mobile Push Alerts</span>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="accent-[var(--accent-main)]"
              />
            </label>
          </div>
        </div>

      </div>

    </div>
  );
}
