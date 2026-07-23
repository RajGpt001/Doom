"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Radio,
  Calendar,
  Layers,
  Image as ImageIcon,
  Users,
  CreditCard,
  Receipt,
  SlidersHorizontal,
  Tag,
  Bell,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  FileText,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Search,
} from "lucide-react";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavGroup {
  groupName: string;
  items: { name: string; href: string; icon: any }[];
}

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    groupName: "OVERVIEW",
    items: [
      { name: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    groupName: "CONTENT & LIVE MEDIA",
    items: [
      { name: "Content Management", href: "/admin/content", icon: Film },
      { name: "Live Channels", href: "/admin/live-channels", icon: Radio },
      { name: "EPG Scheduling", href: "/admin/epg", icon: Calendar },
      { name: "Categories & Genres", href: "/admin/genres", icon: Layers },
      { name: "Banners & Sliders", href: "/admin/banners", icon: ImageIcon },
    ],
  },
  {
    groupName: "USERS & BILLING",
    items: [
      { name: "User Management", href: "/admin/users", icon: Users },
      { name: "Subscription Plans", href: "/admin/plans", icon: CreditCard },
      { name: "Transactions Log", href: "/admin/transactions", icon: Receipt },
      { name: "Payment Gateways", href: "/admin/payment-gateways", icon: SlidersHorizontal },
    ],
  },
  {
    groupName: "MARKETING & ENGAGEMENT",
    items: [
      { name: "Coupons & Discounts", href: "/admin/coupons", icon: Tag },
      { name: "Push Notifications", href: "/admin/notifications", icon: Bell },
      { name: "Review Moderation", href: "/admin/reviews", icon: MessageSquare },
      { name: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
    ],
  },
  {
    groupName: "SYSTEM & CMS",
    items: [
      { name: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck },
      { name: "CMS Page Editor", href: "/admin/cms", icon: FileText },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // If on admin login page, bypass layout shell
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[var(--surface-base)] text-[var(--foreground)]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--foreground)] flex flex-col font-sans select-none">
      
      {/* Admin Topbar */}
      <header className="h-14 border-b border-[var(--border)] bg-[var(--surface-elevated)] sticky top-0 z-40 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded hover:bg-[var(--surface-base)] text-[var(--foreground)] border border-[var(--border)] cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <LogoPlaceholder size="sm" />
            <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[var(--accent-main)] text-[var(--accent-foreground)] rounded">
              CONTROL PANEL
            </span>
          </Link>
        </div>

        {/* Global Admin Search & Quick Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[var(--surface-base)] border border-[var(--border)] rounded px-2.5 py-1 text-xs text-[var(--text-muted)] w-64">
            <Search className="w-3.5 h-3.5 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search users, titles, invoices..."
              className="bg-transparent border-none text-xs text-[var(--foreground)] focus:outline-none w-full"
            />
          </div>

          <ThemeToggle />

          <div className="flex items-center gap-2 border-l border-[var(--border)] pl-3">
            <div className="w-7 h-7 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-black text-xs flex items-center justify-center">
              AD
            </div>
            <div className="hidden md:block text-[11px] leading-tight">
              <div className="font-bold">Super Admin</div>
              <div className="text-[var(--text-muted)] text-[9px]">admin@doomott.com</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Admin Sidebar Navigation */}
        <aside
          className={cn(
            "bg-[var(--surface-elevated)] border-r border-[var(--border)] transition-all duration-300 flex flex-col shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-none",
            isSidebarOpen ? "w-64" : "w-0 hidden md:w-16 md:flex"
          )}
        >
          <div className="p-3 space-y-6 flex-1">
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.groupName} className="space-y-1">
                {isSidebarOpen && (
                  <h5 className="px-2 text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                    {group.groupName}
                  </h5>
                )}

                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.name}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-2 rounded text-xs font-bold transition-colors",
                          isActive
                            ? "bg-[var(--accent-main)] text-[var(--accent-foreground)]"
                            : "text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-base)]"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {isSidebarOpen && <span className="truncate">{item.name}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[var(--border)]">
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-2.5 py-2 rounded text-xs font-bold text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800/40"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {isSidebarOpen && <span>Admin Logout</span>}
            </Link>
          </div>
        </aside>

        {/* Main Admin Workspace Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
