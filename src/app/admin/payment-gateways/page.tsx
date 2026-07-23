"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Key, CheckCircle2 } from "lucide-react";

export default function PaymentGatewaysPage() {
  const [stripeKey, setStripeKey] = useState("pk_test_51Nx...doom");
  const [razorpayKey, setRazorpayKey] = useState("rzp_test_901...doom");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
          Payment Gateway Configurations
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Slot in production API keys for Stripe, Razorpay, and PayPal.
        </p>
      </div>

      <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] max-w-xl space-y-6">
        {saved && (
          <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> API credentials updated!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--text-muted)]">Stripe Publishable Key</label>
            <input
              type="text"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] font-mono text-xs text-[var(--foreground)] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--text-muted)]">Razorpay Key ID</label>
            <input
              type="text"
              value={razorpayKey}
              onChange={(e) => setRazorpayKey(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] font-mono text-xs text-[var(--foreground)] focus:outline-none"
            />
          </div>

          <button type="submit" className="py-2.5 px-6 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-bold text-xs uppercase">
            Save Gateway Credentials
          </button>
        </form>
      </div>
    </div>
  );
}
