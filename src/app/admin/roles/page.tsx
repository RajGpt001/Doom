"use client";

import React from "react";
import { ShieldCheck, UserCheck, Plus } from "lucide-react";

const ROLES = [
  { role: "Super Administrator", members: 2, access: "Full Control (All Modules)" },
  { role: "Content Manager", members: 5, access: "Content, Banners, EPG, Genres" },
  { role: "Billing Manager", members: 3, access: "Plans, Transactions, Gateways, Coupons" },
  { role: "Community Moderator", members: 8, access: "Reviews, Support Tickets, Push Alerts" },
];

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Roles & Sub-Admin RBAC Permissions
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Define role-based access control policies and delegate sub-admin module privileges.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Create Custom Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLES.map((r) => (
          <div key={r.role} className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-main)]" />
                <h3 className="font-display font-bold text-sm text-[var(--foreground)]">{r.role}</h3>
              </div>
              <span className="text-xs font-mono text-[var(--accent-main)] font-bold">{r.members} Members</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Privileges: {r.access}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
