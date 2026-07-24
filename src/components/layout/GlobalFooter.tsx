"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Twitter,
  Instagram,
  AtSign,
  MessageCircle,
  Facebook,
  Linkedin,
  Youtube,
  Sun,
  Moon,
  ArrowUp,
  Heart,
  Globe,
} from "lucide-react";

export function GlobalFooter() {
  const pathname = usePathname();
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (pathname === "/welcome") return null;

  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[var(--border)] text-[var(--text-secondary)] pt-14 pb-10 mt-16 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. TOP BRAND BIO ROW */}
        <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8">
          {/* Signature Red Emblem Logo */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-heading font-black text-2xl shadow-lg shadow-[var(--primary)]/30 border border-[var(--primary-hover)]">
            D
          </div>

          {/* Multi-line Description Paragraph */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal max-w-5xl">
            Welcome to DOOM OTT, where cinematic creativity meets cutting-edge streaming strategy to bring your vision to life. We are passionate about transforming stories into compelling visual experiences, 4K HDR feature blockbusters, and engaging 1-minute vertical micro-dramas that resonate with global audiences. Our mission is to empower creators and viewers to experience cinema without boundaries. We believe in quality, not compromise. DOOM OTT is engineered for ultra-fast, seamless streaming on every screen.
          </p>
        </div>

        {/* 2. DASHED SEPARATOR LINE */}
        <div className="w-full border-t border-dashed border-[#262626]" />

        {/* 3. 6-COLUMN MINIMALIST LINK GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 py-2 text-xs sm:text-sm font-medium">
          
          {/* Column 1 */}
          <div className="flex flex-col space-y-3">
            <Link href="/legal/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/browse" className="hover:text-white transition-colors">Works</Link>
            <Link href="/plans" className="hover:text-white transition-colors">Pricing</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-3">
            <Link href="/shorts" className="hover:text-white transition-colors">Products</Link>
            <Link href="/admin/dashboard" className="hover:text-white transition-colors">Agency</Link>
            <Link href="/account" className="hover:text-white transition-colors">Dashboard</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-3">
            <Link href="/browse" className="hover:text-white transition-colors">4K Movies</Link>
            <Link href="/browse" className="hover:text-white transition-colors">Web Series</Link>
            <Link href="/shorts" className="hover:text-white transition-colors">Micro-Dramas</Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col space-y-3">
            <Link href="/search" className="hover:text-white transition-colors">Categories</Link>
            <Link href="/admin/cms" className="hover:text-white transition-colors">Components</Link>
            <Link href="/legal/faq" className="hover:text-white transition-colors">Blogs</Link>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col space-y-3">
            <Link href="/home" className="hover:text-white transition-colors">Trending</Link>
            <Link href="/browse" className="hover:text-white transition-colors">3D Icons</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Colors</Link>
          </div>

          {/* Column 6 */}
          <div className="flex flex-col space-y-3">
            <Link href="/legal/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>

        </div>

        {/* 4. DASHED SEPARATOR LINE */}
        <div className="w-full border-t border-dashed border-[#262626]" />

        {/* 5. TOOLBAR ROW WITH DASHED ROUNDED PILL BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          {/* Social Icon Pills */}
          <a href="mailto:support@doomott.com" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary-muted)]/30 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Mail className="w-4 h-4" />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary-muted)]/30 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Twitter className="w-4 h-4" />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary-muted)]/30 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Instagram className="w-4 h-4" />
          </a>

          <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary-muted)]/30 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <AtSign className="w-4 h-4" />
          </a>

          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <MessageCircle className="w-4 h-4" />
          </a>

          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-950/20 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Globe className="w-4 h-4" />
          </a>

          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-950/20 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Facebook className="w-4 h-4" />
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-950/20 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Linkedin className="w-4 h-4" />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] text-[var(--text-secondary)] hover:text-red-500 hover:border-red-500/50 hover:bg-red-950/20 transition-all flex items-center justify-center cursor-pointer shadow-sm">
            <Youtube className="w-4 h-4" />
          </a>

          {/* Theme & Back-to-Top Control Pill */}
          <div className="px-3 sm:px-4 h-10 sm:h-11 rounded-2xl border border-dashed border-[#333] bg-[#121212] flex items-center gap-3 text-xs text-[var(--text-secondary)] shadow-sm">
            <Sun className="w-4 h-4 hover:text-amber-400 transition-colors cursor-pointer" />
            <button
              onClick={scrollToTop}
              className="p-1 hover:text-[var(--primary)] transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <Moon className="w-4 h-4 hover:text-blue-400 transition-colors cursor-pointer" />
          </div>

        </div>

        {/* 6. COPYRIGHT FOOTER ROW */}
        <div className="pt-4 text-center text-xs text-[var(--text-secondary)] font-medium flex items-center justify-center gap-1.5">
          <span>© {new Date().getFullYear()} Made with</span>
          <Heart className="w-3.5 h-3.5 text-[var(--primary)] fill-current inline-block animate-pulse" />
          <span>by <strong className="text-white font-bold">DOOM OTT</strong></span>
        </div>

      </div>
    </footer>
  );
}
