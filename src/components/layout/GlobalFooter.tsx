"use client";

import React from "react";
import Link from "next/link";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { Globe } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[var(--border)] text-[var(--text-primary)] pt-12 pb-8 mt-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Expanded Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <LogoPlaceholder size="lg" />
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Doom OTT is a next-generation entertainment streaming platform engineered for 4K feature films, original series, and vertical 1-minute micro-dramas.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--primary)] font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Multi-Device Network</span>
            </div>
          </div>

          {/* Column 1: Account & Plans */}
          <div className="space-y-3">
            <h4 className="font-heading uppercase text-sm tracking-wider text-white">
              Subscription & Account
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
              <li><Link href="/plans" className="hover:text-[var(--primary)] transition-colors">Subscription Plans</Link></li>
              <li><Link href="/billing" className="hover:text-[var(--primary)] transition-colors">Payment & Receipts</Link></li>
              <li><Link href="/profiles" className="hover:text-[var(--primary)] transition-colors">Manage Profiles</Link></li>
              <li><Link href="/account" className="hover:text-[var(--primary)] transition-colors">Account Settings</Link></li>
            </ul>
          </div>

          {/* Column 2: Security & Alerts */}
          <div className="space-y-3">
            <h4 className="font-heading uppercase text-sm tracking-wider text-white">
              Security & Alerts
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
              <li><Link href="/parental-controls" className="hover:text-[var(--primary)] transition-colors">Parental Controls (PIN)</Link></li>
              <li><Link href="/notifications" className="hover:text-[var(--primary)] transition-colors">Notifications</Link></li>
              <li><Link href="/reviews" className="hover:text-[var(--primary)] transition-colors">My Ratings & Reviews</Link></li>
              <li><Link href="/watchlist" className="hover:text-[var(--primary)] transition-colors">My Watchlist</Link></li>
            </ul>
          </div>

          {/* Column 3: Help & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading uppercase text-sm tracking-wider text-white">
              Help & Legal
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
              <li><Link href="/legal/faq" className="hover:text-[var(--primary)] transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/about" className="hover:text-[var(--primary)] transition-colors">About Doom OTT</Link></li>
            </ul>
          </div>

        </div>

        {/* Lower Footer Copyright */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between text-xs text-[var(--text-secondary)] gap-4">
          <p>© {new Date().getFullYear()} DOOM OTT Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/legal/contact" className="hover:text-white transition-colors cursor-pointer">Contact Support</Link>
            <Link href="/legal/faq" className="hover:text-white transition-colors cursor-pointer">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
