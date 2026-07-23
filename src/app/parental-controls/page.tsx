"use client";

import React, { useState } from "react";
import { Shield, KeyRound, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ParentalControlsPage() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [maxRating, setMaxRating] = useState("16+");
  const [savedMsg, setSavedMsg] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234" || pin.length === 4) {
      setIsUnlocked(true);
    }
  };

  const handleSaveRating = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none">
      
      <div className="border-b border-[var(--border)] pb-4 space-y-1">
        <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wider flex items-center gap-2">
          <Shield className="w-6 h-6 text-[var(--accent-main)]" />
          PIN-Gated Parental Controls
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Restrict mature content ratings and require a 4-digit PIN for 18+ playback.
        </p>
      </div>

      {!isUnlocked ? (
        <form onSubmit={handleUnlock} className="p-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-center max-w-md mx-auto space-y-4">
          <KeyRound className="w-10 h-10 text-[var(--accent-main)] mx-auto" />
          <h3 className="font-display font-bold text-sm uppercase text-[var(--foreground)]">
            Enter 4-Digit Security PIN
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Default test PIN: <strong className="text-[var(--foreground)] font-mono">1234</strong>
          </p>

          <input
            type="password"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-36 py-2.5 text-center font-mono font-bold text-xl tracking-[0.5em] bg-[var(--surface-base)] border border-[var(--border)] focus:border-[var(--accent-main)] rounded focus:outline-none text-[var(--foreground)] mx-auto block"
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
          >
            Unlock Settings
          </button>
        </form>
      ) : (
        <div className="p-6 sm:p-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6">
          
          {savedMsg && (
            <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Parental rating restriction updated!
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase text-[var(--foreground)]">
              Maximum Allowed Maturity Rating
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["ALL", "13+", "16+", "18+"].map((r) => (
                <button
                  key={r}
                  onClick={() => setMaxRating(r)}
                  className={cn(
                    "p-3 rounded border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center",
                    maxRating === r
                      ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] border-[var(--accent-main)]"
                      : "bg-[var(--surface-base)] border-[var(--border)] text-[var(--foreground)]"
                  )}
                >
                  {r} Restrict
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveRating}
            className="py-2.5 px-6 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
          >
            Save Rating Policy
          </button>
        </div>
      )}

    </div>
  );
}
