"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@doomott.com");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--surface-base)] select-none">
      <div className="w-full max-w-md p-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <LogoPlaceholder size="lg" className="justify-center" />
          <h2 className="font-display font-black uppercase text-xl text-[var(--foreground)] tracking-wider pt-2">
            Internal Admin Console
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Authorized administrative personnel access only.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Admin Email
            </label>
            <div className="flex items-center px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)]">
              <Mail className="w-4 h-4 text-[var(--text-muted)] mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none text-xs text-[var(--foreground)] focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Security Password
            </label>
            <div className="flex items-center px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)]">
              <Lock className="w-4 h-4 text-[var(--text-muted)] mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-none text-xs text-[var(--foreground)] focus:outline-none w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticate Admin Portal</span>
          </button>
        </form>
      </div>
    </div>
  );
}
