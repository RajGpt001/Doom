"use client";

import React from "react";
import Link from "next/link";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { Globe } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="w-full bg-[var(--surface-base)] border-t border-[var(--border)] text-[var(--foreground)] pt-12 pb-8 mt-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <LogoPlaceholder size="lg" />
            <p className="text-xs text-[var(--text-muted)] max-w-sm leading-relaxed">
              Doom OTT is a next-generation entertainment streaming platform engineered for 4K feature films, original series, and vertical 1-minute micro-dramas.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--accent-main)] font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Multi-Device Network</span>
            </div>
          </div>

          {/* Column 1: Account & Plans */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">
              Subscription & Account
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-medium">
              <li><Link href="/plans" className="hover:text-[var(--accent-main)] transition-colors">Subscription Plans</Link></li>
              <li><Link href="/billing" className="hover:text-[var(--accent-main)] transition-colors">Payment & Receipts</Link></li>
              <li><Link href="/profiles" className="hover:text-[var(--accent-main)] transition-colors">Manage Profiles</Link></li>
              <li><Link href="/account" className="hover:text-[var(--accent-main)] transition-colors">Account Settings</Link></li>
            </ul>
          </div>

          {/* Column 2: Controls & Alerts */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">
              Security & Alerts
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-medium">
              <li><Link href="/parental-controls" className="hover:text-[var(--accent-main)] transition-colors">Parental Controls (PIN)</Link></li>
              <li><Link href="/notifications" className="hover:text-[var(--accent-main)] transition-colors">Notifications</Link></li>
              <li><Link href="/reviews" className="hover:text-[var(--accent-main)] transition-colors">My Ratings & Reviews</Link></li>
              <li><Link href="/watchlist" className="hover:text-[var(--accent-main)] transition-colors">My Watchlist</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">
              Help & Legal
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-medium">
              <li><Link href="/legal/faq" className="hover:text-[var(--accent-main)] transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-[var(--accent-main)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[var(--accent-main)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/about" className="hover:text-[var(--accent-main)] transition-colors">About Doom OTT</Link></li>
            </ul>
          </div>

        </div>

        {/* Lower Footer Copyright */}
        <div className="pt-6 border-t border-[var(--border)]/60 flex flex-col md:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <p>© {new Date().getFullYear()} DOOM OTT Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/legal/contact" className="hover:text-[var(--foreground)] cursor-pointer">Contact Support</Link>
            <Link href="/legal/faq" className="hover:text-[var(--foreground)] cursor-pointer">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
