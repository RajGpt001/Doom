"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Zap, Film, Home, Menu, X, User } from "lucide-react";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAppStore } from "@/store/useAppStore";
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { watchlist, isLoggedIn: isAppLoggedIn, logoutMockUser } = useAppStore();
  const { isSignedIn } = useUser();

  const isLoggedIn = isSignedIn || isAppLoggedIn;

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
          ? "bg-[var(--surface-base)]/95 border-[var(--border)] shadow-lg py-3"
          : "bg-[var(--surface-base)] border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-6">
          <LogoPlaceholder size="md" />

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.name === "Home" && (pathname === "/" || pathname === "/home"));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-display text-xs uppercase tracking-wider font-bold transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]",
                    link.isSpecial
                      ? "text-[var(--micro-drama-accent)] bg-[var(--micro-drama-bg)] border border-[var(--micro-drama-accent)]/30 hover:border-[var(--micro-drama-accent)]"
                      : isActive
                      ? "text-[var(--accent-main)] bg-[var(--accent-subtle)] border border-[var(--accent-main)]/30"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                  {link.badgeCount !== undefined && link.badgeCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[var(--accent-main)] text-[var(--accent-foreground)] font-black rounded-full">
                      {link.badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search + Theme Toggle + User Profile */}
        <div className="flex items-center gap-2.5">
          
          {/* Search Box */}
          <Link
            href="/search"
            className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
            aria-label="Open Search Catalog"
            title="Search Catalog"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* User Profile vs Sign In / Sign Up Button (Guest Mode) */}
          <div className="flex items-center border-l border-[var(--border)] pl-2.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 rounded-sm border border-[var(--border)]",
                      },
                    }}
                  />
                </SignedIn>
                {!isSignedIn && isAppLoggedIn && (
                  <button
                    onClick={logoutMockUser}
                    className="px-2.5 py-1 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[10px] font-bold uppercase text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            ) : (
              /* Guest Mode: Show Sign In / Sign Up Button */
              <Link href="/welcome">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase tracking-wider font-bold hover:brightness-110 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)] shadow-sm">
                  <User className="w-3.5 h-3.5" /> Sign In / Sign Up
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors focus:outline-none"
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
            className="lg:hidden bg-[var(--surface-base)] border-b border-[var(--border)] px-4 py-4 space-y-2 overflow-hidden"
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
                    "flex items-center justify-between px-3 py-2.5 rounded font-display text-xs uppercase tracking-wider font-bold transition-colors",
                    link.isSpecial
                      ? "text-[var(--micro-drama-accent)] bg-[var(--micro-drama-bg)] border border-[var(--micro-drama-accent)]/30"
                      : isActive
                      ? "text-[var(--accent-main)] bg-[var(--accent-subtle)] border border-[var(--accent-main)]/30"
                      : "text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  {link.badgeCount !== undefined && link.badgeCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] bg-[var(--accent-main)] text-[var(--accent-foreground)] font-black rounded-full">
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
