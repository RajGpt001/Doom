"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAppStore } from "@/store/useAppStore";
import {
  Zap,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { AuthTabs } from "@/components/entry/AuthTabs";
import { FULL_CATALOG_ITEMS, MOCK_SHORT_FORM_SERIES } from "@/data/mockMedia";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What is Doom OTT?",
    a: "Doom OTT is a hybrid entertainment streaming platform offering 4K feature films, original multi-season series, and a signature 1-minute vertical micro-drama feed.",
  },
  {
    q: "How does the 1-Minute Micro-Drama Feed ⚡ work?",
    a: "Unlike endless random scrolling, our micro-dramas are chaptered series (e.g. Episode 1 of 8) with top progress rails and 3D card flipping between episodes.",
  },
  {
    q: "Can I watch on multiple devices?",
    a: "Yes! Doom OTT works seamlessly across web browsers, smartphones, tablets, and smart TVs with multi-profile support.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "You can cancel or change your streaming plan anytime under Account Settings with zero cancellation fees.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { isLoggedIn: isAppLoggedIn } = useAppStore();

  const [emailInput, setEmailInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Auto-redirect logged-in users straight to the Media Catalog (/home)
  useEffect(() => {
    if (isLoaded && (isSignedIn || isAppLoggedIn)) {
      router.push("/home");
    }
  }, [isSignedIn, isLoaded, isAppLoggedIn, router]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/welcome");
  };

  return (
    <div className="space-y-16 pb-16 select-none">
      
      {/* 1. HERO LANDING BANNER SECTION */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-16 overflow-hidden rounded-b-2xl border-b border-[var(--border)] bg-[var(--surface-elevated)]">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent-main)]/10 filter blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-main)]/30 text-[var(--accent-main)] font-display text-xs font-black uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-current animate-pulse text-[var(--micro-drama-accent)]" />
            <span>THE NEXT EVOLUTION OF STREAMING</span>
          </div>

          <h1 className="font-display font-black uppercase text-3xl sm:text-5xl md:text-6xl text-[var(--foreground)] tracking-tight leading-[1.1]">
            Unlimited 4K Cinema & <br />
            <span className="text-[var(--accent-main)]">1-Minute Micro-Dramas</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Stream blockbuster feature films, original series, and vertical web-dramas on your phone, tablet, and smart TV.
          </p>

          {/* Quick Email Registration / Start Watching Bar */}
          <form onSubmit={handleStart} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-4">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="flex-1 px-4 py-3.5 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none placeholder:text-[var(--text-muted)]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer shrink-0"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 text-xs text-[var(--text-muted)] font-medium pt-2">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel Anytime</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4K Ultra HD</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Profiles</span>
          </div>

        </div>
      </section>

      {/* 2. INLINE CLERK AUTHENTICATION SECTION (Sign In / Signup with Google) */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--accent-main)] rounded">
            CLERK SECURITY AUTHENTICATION
          </span>
          <h2 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)]">
            Sign In or Create Your Account
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Use Google Social Sign-In or your Email credentials to access the full catalog.
          </p>
        </div>

        {/* Embedded Clerk Auth Component */}
        <AuthTabs onSuccess={() => router.push("/home")} />
      </section>

      {/* 3. DUAL FEATURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Showcase 1: 4K Cinema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
          <div className="space-y-4">
            <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-[var(--accent-subtle)] text-[var(--accent-main)] rounded border border-[var(--accent-main)]/30">
              CINEMATIC VOD
            </span>
            <h3 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] leading-snug">
              Enjoy Blockbuster 4K Movies & Original Series
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Immerse yourself in rich, high-contrast films with Dolby Digital audio. Stream on your Smart TV, laptop, or tablet.
            </p>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {FULL_CATALOG_ITEMS.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden border border-[var(--border)] aspect-[2/3] group relative">
                <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex items-end">
                  <span className="font-display font-bold text-[10px] text-white truncate">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showcase 2: Vertical 1-Min Micro-Dramas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 rounded-xl bg-[var(--surface-elevated)] border-2 border-[var(--micro-drama-accent)]/60">
          
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-56 aspect-[9/16] rounded-xl overflow-hidden border-2 border-[var(--micro-drama-accent)] shadow-2xl relative bg-black">
              <img
                src={MOCK_SHORT_FORM_SERIES[0].posterUrl}
                alt="Shorts Preview"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[8px] font-black uppercase text-[var(--micro-drama-accent)] bg-black/70 px-2 py-1 rounded border border-[var(--micro-drama-accent)]/40">
                <Zap className="w-2.5 h-2.5 fill-current animate-pulse" />
                <span>CHAPTER 1 OF 8</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent text-white space-y-1">
                <span className="text-[9px] font-bold text-[var(--micro-drama-accent)] uppercase">100 SECONDS OF BETRAYAL</span>
                <h4 className="font-display font-black text-xs uppercase">The Secret Oath</h4>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-4">
            <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-[var(--micro-drama-bg)] text-[var(--micro-drama-accent)] rounded border border-[var(--micro-drama-accent)]/40 flex items-center gap-1 w-fit">
              <Zap className="w-3 h-3 fill-current" />
              <span>SIGNATURE 60-SECOND FEED</span>
            </span>
            <h3 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] leading-snug">
              Vertical Micro-Dramas & 1-Minute Episodes
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Designed for high-energy mobile viewing. Watch chaptered mini-series with top progress rails and 3D card flips.
            </p>
            <Link
              href="/shorts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
            >
              <span>Launch Micro-Dramas Feed ⚡</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>

      {/* 4. TIERED PRICING IN INR (₹) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-[var(--accent-subtle)] text-[var(--accent-main)] rounded border border-[var(--accent-main)]/30">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-display font-black uppercase text-2xl sm:text-4xl text-[var(--foreground)]">
            Choose Your Streaming Plan
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            No hidden fees. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "DOOM BASIC", price: "₹149", quality: "1080p Full HD", screens: "1 Screen" },
            { name: "DOOM STANDARD 4K", price: "₹499", quality: "4K Ultra HD", screens: "2 Screens", popular: true },
            { name: "DOOM PREMIUM ULTRA", price: "₹799", quality: "4K HDR10+ & Dolby Vision", screens: "4 Screens" },
          ].map((p) => (
            <div
              key={p.name}
              className={cn(
                "p-6 rounded-lg bg-[var(--surface-elevated)] border-2 flex flex-col justify-between space-y-6",
                p.popular ? "border-[var(--accent-main)] shadow-xl" : "border-[var(--border)]"
              )}
            >
              <div className="space-y-4">
                {p.popular && (
                  <span className="px-2.5 py-0.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-black text-[10px] uppercase tracking-widest">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display font-extrabold text-sm uppercase text-[var(--foreground)]">{p.name}</h3>
                <div className="font-display font-black text-3xl text-[var(--foreground)]">{p.price}<span className="text-xs font-normal text-[var(--text-muted)]">/mo</span></div>

                <div className="text-xs text-[var(--text-muted)] space-y-1.5 border-t border-[var(--border)] pt-3">
                  <div>Quality: <strong className="text-[var(--foreground)]">{p.quality}</strong></div>
                  <div>Screens: <strong className="text-[var(--foreground)]">{p.screens}</strong></div>
                  <div>Micro-Dramas: <strong className="text-[var(--accent-main)]">Unlimited ⚡</strong></div>
                </div>
              </div>

              <Link
                href={`/checkout?plan=${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="w-full text-center py-2.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ ACCORDION SECTION */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Everything you need to know about Doom OTT subscriptions and device support.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-display font-bold text-xs uppercase text-[var(--foreground)] flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <Minus className="w-4 h-4 text-[var(--accent-main)]" /> : <Plus className="w-4 h-4 text-[var(--text-muted)]" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
