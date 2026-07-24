"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { RadialIntroOverlay } from "@/components/ui/radial-intro";
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
  const [emailInput, setEmailInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const authSection = document.getElementById("auth-section");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/welcome");
    }
  };

  const handleAuthSuccess = () => {
    router.push("/home");
  };

  return (
    <div className="space-y-16 pb-16 select-none relative">
      
      {/* 🌟 3D RADIAL ORBITAL INTRO (Pops up immediately on window open with ENTER button) */}
      <RadialIntroOverlay />

      {/* 1. HERO LANDING BANNER SECTION */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 overflow-hidden rounded-b-3xl border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[#0A0A0A]">
        
        {/* Ambient Red Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/15 filter blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-muted)]/20 border border-[var(--primary)]/30 text-[var(--primary)] font-sans text-[11px] font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse text-[var(--primary)]" />
            <span>THE NEXT EVOLUTION OF STREAMING</span>
          </div>

          <h1 className="font-heading uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] font-black">
            Unlimited 4K Cinema & <br />
            <span className="text-[var(--primary)] drop-shadow-[0_0_35px_rgba(229,9,20,0.25)]">1-Minute Micro-Dramas</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Stream blockbuster feature films, exclusive original series, and vertical web-dramas on your phone, tablet, and smart TV.
          </p>

          {/* Quick Email Registration / Start Watching Bar */}
          <form onSubmit={handleStart} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-6 w-full">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="flex-1 px-5 py-4 rounded-xl bg-black/60 border border-[var(--border)] text-xs text-white focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none placeholder:text-[var(--text-secondary)] transition-all shadow-inner"
            />
            <button
              type="submit"
              className="px-7 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] text-white font-sans text-xs uppercase tracking-wider font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98] border border-white/10"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 text-xs text-[var(--text-secondary)] font-medium pt-2">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--primary)]" /> Cancel Anytime</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--primary)]" /> 4K Ultra HD</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--primary)]" /> Multi-Profiles</span>
          </div>

        </div>
      </section>

      {/* 2. INLINE AUTHENTICATION SECTION */}
      <section id="auth-section" className="max-w-4xl mx-auto px-4 space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-xs font-bold uppercase bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--primary)] rounded-full font-sans tracking-wider">
            SECURE FIREBASE AUTHENTICATION
          </span>
          <h2 className="font-heading uppercase text-3xl sm:text-4xl text-white font-extrabold">
            Sign In or Create Your Account
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Use Google Social Sign-In or your Email credentials to access the full catalog.
          </p>
        </div>

        <AuthTabs onSuccess={handleAuthSuccess} />
      </section>

      {/* 3. DUAL FEATURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Showcase 1: 4K Cinema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="space-y-4">
            <span className="px-2.5 py-1 text-xs font-bold uppercase bg-[var(--primary-muted)]/30 text-[var(--primary)] rounded border border-[var(--primary)]/30 font-heading">
              CINEMATIC VOD
            </span>
            <h3 className="font-heading uppercase text-3xl sm:text-4xl text-white leading-snug">
              Enjoy Blockbuster 4K Movies & Original Series
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Immerse yourself in rich, high-contrast films with Dolby Digital audio. Stream on your Smart TV, laptop, or tablet.
            </p>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-sm uppercase tracking-wider"
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
                  <span className="font-heading font-bold text-xs text-white truncate uppercase">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showcase 2: Vertical 1-Min Micro-Dramas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 rounded-xl bg-[var(--surface)] border-2 border-[var(--primary)]/60">
          
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-56 aspect-[9/16] rounded-xl overflow-hidden border-2 border-[var(--primary)] shadow-2xl relative bg-black">
              <img
                src={MOCK_SHORT_FORM_SERIES[0].posterUrl}
                alt="Shorts Preview"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[9px] font-bold uppercase text-[var(--primary)] bg-black/80 px-2 py-1 rounded border border-[var(--primary)]/40 font-heading">
                <Zap className="w-2.5 h-2.5 fill-current animate-pulse" />
                <span>CHAPTER 1 OF 8</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent text-white space-y-1">
                <span className="text-[10px] font-bold text-[var(--primary)] uppercase font-heading">100 SECONDS OF BETRAYAL</span>
                <h4 className="font-heading uppercase text-sm">The Secret Oath</h4>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-4">
            <span className="px-2.5 py-1 text-xs font-bold uppercase bg-[var(--primary-muted)]/40 text-[var(--primary)] rounded border border-[var(--primary)]/40 flex items-center gap-1 w-fit font-heading">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>SIGNATURE 60-SECOND FEED</span>
            </span>
            <h3 className="font-heading uppercase text-3xl sm:text-4xl text-white leading-snug">
              Vertical Micro-Dramas & 1-Minute Episodes
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Designed for high-energy mobile viewing. Watch chaptered mini-series with top progress rails and 3D card flips.
            </p>
            <Link
              href="/shorts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-sm uppercase tracking-wider shadow-lg"
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
          <span className="px-2.5 py-1 text-xs font-bold uppercase bg-[var(--primary-muted)]/30 text-[var(--primary)] rounded border border-[var(--primary)]/30 font-heading">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-heading uppercase text-3xl sm:text-4xl text-white">
            Choose Your Streaming Plan
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
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
                "p-6 rounded-lg bg-[var(--surface)] border-2 flex flex-col justify-between space-y-6",
                p.popular ? "border-[var(--primary)] shadow-xl" : "border-[var(--border)]"
              )}
            >
              <div className="space-y-4">
                {p.popular && (
                  <span className="px-2.5 py-0.5 rounded bg-[var(--primary)] text-white font-heading font-bold text-xs uppercase tracking-widest">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-heading uppercase text-base text-white">{p.name}</h3>
                <div className="font-heading text-4xl text-white">{p.price}<span className="text-xs font-normal text-[var(--text-secondary)]">/mo</span></div>

                <div className="text-xs text-[var(--text-secondary)] space-y-1.5 border-t border-[var(--border)] pt-3">
                  <div>Quality: <strong className="text-white">{p.quality}</strong></div>
                  <div>Screens: <strong className="text-white">{p.screens}</strong></div>
                  <div>Micro-Dramas: <strong className="text-[var(--primary)]">Unlimited ⚡</strong></div>
                </div>
              </div>

              <Link
                href={`/checkout?plan=${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="w-full text-center py-3 rounded bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-sm uppercase tracking-wider"
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
          <h2 className="font-heading uppercase text-3xl text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Everything you need to know about Doom OTT subscriptions and device support.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-lg bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-heading text-sm uppercase text-white flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <Minus className="w-4 h-4 text-[var(--primary)]" /> : <Plus className="w-4 h-4 text-[var(--text-secondary)]" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]/60 pt-3">
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
