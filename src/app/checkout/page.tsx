"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "standard-4k";

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("upi");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const planPrices: Record<string, { name: string; price: string }> = {
    basic: { name: "DOOM BASIC", price: "₹149" },
    "doom-basic": { name: "DOOM BASIC", price: "₹149" },
    "standard-4k": { name: "DOOM STANDARD 4K", price: "₹499" },
    "doom-standard-4k": { name: "DOOM STANDARD 4K", price: "₹499" },
    "premium-ultra": { name: "DOOM PREMIUM ULTRA", price: "₹799" },
    "doom-premium-ultra": { name: "DOOM PREMIUM ULTRA", price: "₹799" },
  };

  const selectedPlan = planPrices[planId] || planPrices["standard-4k"];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Left 2 Cols: Payment Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Payment Method Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={cn(
                    "p-3 rounded border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                    paymentMethod === "upi"
                      ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] border-[var(--accent-main)]"
                      : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--foreground)]"
                  )}
                >
                  UPI / QR
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "p-3 rounded border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                    paymentMethod === "card"
                      ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] border-[var(--accent-main)]"
                      : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--foreground)]"
                  )}
                >
                  <CreditCard className="w-4 h-4" /> Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={cn(
                    "p-3 rounded border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                    paymentMethod === "netbanking"
                      ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] border-[var(--accent-main)]"
                      : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--foreground)]"
                  )}
                >
                  NetBanking
                </button>
              </div>
            </div>

            {/* Payment Fields */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {paymentMethod === "upi" && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Virtual Payment Address (VPA) / UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="name@upi (e.g. user@okicici)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none"
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8912"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {selectedPlan.price} & Activate Plan</span>
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] pt-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-main)]" />
              <span>PCI-DSS Compliant Payment Gateway Ready (Razorpay / Stripe)</span>
            </div>
          </div>

          {/* Right Col: Order Summary */}
          <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 h-fit">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-[var(--foreground)] border-b border-[var(--border)] pb-2">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[var(--foreground)]">
                <span>Selected Plan:</span>
                <span className="text-[var(--accent-main)]">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Billing Cycle:</span>
                <span>Monthly Auto-Renew</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal:</span>
                <span>{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>GST Tax (18% included):</span>
                <span>₹0.00</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-between font-display font-bold text-sm text-[var(--foreground)]">
              <span>Total Payable:</span>
              <span className="text-[var(--accent-main)]">{selectedPlan.price}</span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Confirmation Success State */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-center max-w-lg mx-auto space-y-4"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
          <h2 className="font-display font-black uppercase text-2xl text-[var(--foreground)]">
            Subscription Active!
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Your account has been upgraded to <strong className="text-[var(--accent-main)]">{selectedPlan.name}</strong>. Enjoy 4K HDR streaming and vertical micro-dramas.
          </p>

          <button
            onClick={() => router.push("/home")}
            className="px-6 py-3 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            Start Watching Now →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-8">
      <div className="border-b border-[var(--border)] pb-4 space-y-1">
        <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wider">
          Secure Plan Checkout
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Complete your subscription setup. High-grade end-to-end encrypted transaction.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-center text-xs animate-pulse">Loading Checkout Gateway...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
