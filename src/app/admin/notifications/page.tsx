"use client";

import React, { useState } from "react";
import { Bell, Send, CheckCircle2 } from "lucide-react";

export default function PushNotificationsAdminPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("all");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setTitle("");
      setBody("");
    }, 2000);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
          Push Notification Manager
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Broadcast instant push notifications to web, iOS, and Android mobile subscribers.
        </p>
      </div>

      <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] max-w-xl space-y-4">
        {sentSuccess && (
          <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Push broadcast dispatched to active subscribers!
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--text-muted)]">Notification Title</label>
            <input
              type="text"
              placeholder="e.g. ⚡ New Micro-Drama Premiere!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--text-muted)]">Notification Message Body</label>
            <textarea
              rows={3}
              placeholder="e.g. Watch Chapter 8 of 100 Seconds of Betrayal now streaming."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none"
            />
          </div>

          <button type="submit" className="py-2.5 px-6 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-bold text-xs uppercase flex items-center gap-2">
            <Send className="w-4 h-4" /> Dispatch Push Broadcast
          </button>
        </form>
      </div>
    </div>
  );
}
