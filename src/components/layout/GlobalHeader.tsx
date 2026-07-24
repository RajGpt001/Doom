"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Bookmark, Zap, Film, Home, Menu, X, User } from "lucide-react";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { watchlist, isLoggedIn, user, logoutMockUser, searchQuery, setSearchQuery } = useAppStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (pathname !== "/search" && e.target.value.trim() !== "") {
      router.push("/search");
    }
  };

  if (pathname === "/welcome") return null;

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
      className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A] border-b border-[var(--border)] shadow-lg py-3 select-none"
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
                    "flex items-center gap-2 px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-wider font-extrabold transition-colors relative focus:outline-none",
                    link.isSpecial
                      ? "text-[var(--primary)] bg-[var(--primary-muted)]/10 hover:bg-[var(--primary-muted)]/20"
                      : isActive
                      ? "text-white bg-[#1A1A1A]"
                      : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
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
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Inline Search Input Bar (Desktop) */}
          <div className="relative hidden md:flex items-center bg-[var(--surface-elevated)] border border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-1 focus-within:ring-[var(--primary)]/25 rounded-lg py-1.5 px-3 w-40 lg:w-56 transition-all">
            <Search className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent border-none text-[11px] text-white focus:outline-none px-2 w-full placeholder:text-[var(--text-secondary)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-0.5 rounded text-[var(--text-secondary)] hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Icon (Mobile Viewport Trigger - links to /search page) */}
          <Link
            href="/search"
            className="md:hidden p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:text-white hover:border-[var(--primary)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-label="Open Search Catalog"
            title="Search Catalog"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* User Profile vs Sign In / Sign Up Button */}
          <div className="flex items-center border-l border-[var(--border)] pl-2 sm:pl-3 gap-1.5 sm:gap-2.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* User Profile Avatar */}
                {user && (
                  <div className="relative group flex-shrink-0">
                    <img
                      src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                      alt={user.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--primary)] object-cover shadow-md shadow-[var(--primary)]/10"
                      title={user.name}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-[#0A0A0A]" />
                  </div>
                )}
                <button
                  onClick={logoutMockUser}
                  className="px-2 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden text-[9px]">Exit</span>
                </button>
              </div>
            ) : (
              /* Guest Mode: Show Sign In / Sign Up Button */
              <Link href="/welcome">
                <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2 rounded-md bg-[var(--primary)] text-white font-sans text-[10px] sm:text-xs uppercase tracking-wider font-extrabold hover:bg-[var(--primary-hover)] transition-all cursor-pointer shadow-md">
                  <User className="w-4 h-4" />
                  <span className="hidden xs:inline sm:inline">Sign In</span>
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
