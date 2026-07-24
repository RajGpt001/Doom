"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Zap, Film, Home, Menu, X, User } from "lucide-react";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { watchlist, isLoggedIn, user, logoutMockUser } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: isLoggedIn ? "/home" : "/", icon: Home },
    { name: "Browse", href: "/browse", icon: Film },
    { name: "Micro-Dramas ⚡", href: "/shorts", icon: Zap, isSpecial: true },
    { name: "Search", href: "/search", icon: Search },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark, badgeCount: watchlist.length },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b select-none",
        isScrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-[var(--border)] shadow-lg py-2.5"
          : "bg-[#0A0A0A] border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
        
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <LogoPlaceholder size="md" />

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.name === "Home" && (pathname === "/" || pathname === "/home"));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] border border-transparent",
                    link.isSpecial
                      ? "text-[var(--primary)] bg-[var(--primary-muted)]/15 border-[var(--primary)]/20 hover:bg-[var(--primary-muted)]/25 hover:border-[var(--primary)]/50"
                      : isActive
                      ? "text-white bg-[var(--surface-elevated)] border-[var(--border)]"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface-elevated)]/50"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5", link.isSpecial && "text-[var(--primary)]")} />
                  <span>{link.name}</span>
                  {link.badgeCount !== undefined && link.badgeCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-[var(--primary)] text-white font-extrabold rounded-full font-sans">
                      {link.badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search + Theme Toggle + User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Search Box Icon (Only if not active) */}
          {pathname !== "/search" && (
            <Link
              href="/search"
              className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:text-white hover:border-[var(--primary)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              aria-label="Open Search Catalog"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </Link>
          )}

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* User Profile vs Sign In / Sign Up Button */}
          <div className="flex items-center border-l border-[var(--border)] pl-3 gap-2.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* User Profile Avatar */}
                {user && (
                  <div className="relative group">
                    <img
                      src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-[var(--primary)] object-cover shadow-md shadow-[var(--primary)]/10"
                      title={user.name}
                    />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A0A0A]" />
                  </div>
                )}
                <button
                  onClick={logoutMockUser}
                  className="px-3.5 py-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-sans font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              /* Guest Mode: Show Sign In / Sign Up Button */
              <Link href="/welcome">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-sans text-xs uppercase tracking-wider font-extrabold hover:bg-[var(--primary-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 border border-white/10">
                  <User className="w-3.5 h-3.5" /> Sign In / Sign Up
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-white hover:border-[var(--primary)] transition-all focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0A0A0A] border-b border-[var(--border)] px-4 py-4 space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all border border-transparent",
                    link.isSpecial
                      ? "text-[var(--primary)] bg-[var(--primary-muted)]/15 border-[var(--primary)]/20"
                      : isActive
                      ? "text-white bg-[var(--surface-elevated)] border-[var(--border)]"
                      : "text-white hover:bg-[var(--surface-elevated)]/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  {link.badgeCount !== undefined && link.badgeCount > 0 && (
                    <span className="px-2 py-0.5 text-[9px] bg-[var(--primary)] text-white font-extrabold rounded-full font-sans">
                      {link.badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
