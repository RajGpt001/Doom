"use client";

import React, { useState } from "react";
import { Users, Ban, ShieldCheck, Search, Edit } from "lucide-react";

const MOCK_USERS = [
  { id: "u1", name: "Alex Vance", email: "alex.vance@doomott.com", plan: "Standard 4K", status: "Active", joined: "2026-01-12" },
  { id: "u2", name: "Elena Rostova", email: "elena.r@gmail.com", plan: "Premium Ultra", status: "Active", joined: "2026-03-04" },
  { id: "u3", name: "Marcus Miller", email: "marcus.m@yahoo.com", plan: "Basic", status: "Blocked", joined: "2026-02-19" },
  { id: "u4", name: "Sarah Connor", email: "sconnor@skynet.org", plan: "Standard 4K", status: "Active", joined: "2026-05-22" },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");

  const toggleBlock = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u
      )
    );
  };

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Subscriber & User Management
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Manage subscriber accounts, plan tiers, and account suspension status.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
        <div className="flex items-center bg-[var(--surface-base)] border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--foreground)] w-72">
          <Search className="w-3.5 h-3.5 mr-2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by subscriber name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none w-full text-xs"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[var(--foreground)]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Current Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/60">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[var(--surface-base)]/50">
                  <td className="py-3 px-4 font-bold">
                    <div>{u.name}</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-normal">{u.email}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[var(--accent-main)]">{u.plan}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${u.status === "Active" ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40" : "bg-red-950/60 text-red-400 border-red-800/40"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--text-muted)]">{u.joined}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => toggleBlock(u.id)} className="px-2 py-1 rounded bg-[var(--surface-base)] border border-[var(--border)] text-[10px] font-bold uppercase hover:border-red-500">
                      {u.status === "Active" ? "Suspend" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
