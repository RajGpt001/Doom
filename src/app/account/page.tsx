"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Shield, KeyRound, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function AccountSettingsPage() {
  const { user } = useAppStore();

  const [email, setEmail] = useState(user?.email || "alex.vance@doomott.com");
  const [name, setName] = useState(user?.name || "Alex Vance");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wider flex items-center gap-2">
          <User className="w-6 h-6 text-[var(--accent-main)]" />
          Account & Security Settings
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Manage your email credentials, security settings, and linked social accounts.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6">
        
        {savedSuccess && (
          <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Account settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Account Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Change Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
          >
            Save Changes
          </button>
        </form>

        <div className="pt-6 border-t border-[var(--border)] space-y-3">
          <h4 className="font-display font-bold text-xs uppercase text-[var(--foreground)]">
            Linked Social Identity
          </h4>
          <div className="flex items-center justify-between p-3 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--accent-main)]" />
              <span>Google Account (alex.vance@gmail.com)</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] uppercase">Connected</span>
          </div>
        </div>

      </div>

    </div>
  );
}
