"use client";

import React, { useState } from "react";
import { LifeBuoy, Check, MessageSquare } from "lucide-react";

const TICKETS = [
  { id: "TCK-801", user: "Alex Vance", issue: "Cannot stream 4K on FireTV stick", status: "Open", priority: "High" },
  { id: "TCK-802", user: "Elena Rostova", issue: "Double charge inquiry", status: "Resolved", priority: "Medium" },
  { id: "TCK-803", user: "Marcus Miller", issue: "Subtitle out of sync on Chapter 4", status: "Open", priority: "Low" },
];

export default function SupportTicketsAdminPage() {
  const [tickets, setTickets] = useState(TICKETS);

  const resolveTicket = (id: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t)));
  };

  return (
    <div className="space-y-6 select-none">
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
          Support Ticket & Help Desk Management
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Resolve customer inquiries, streaming issues, and billing support requests.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] overflow-x-auto">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">Ticket ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Issue Description</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-[var(--surface-base)]/50">
                <td className="py-3 px-4 font-mono font-bold text-[var(--accent-main)]">{t.id}</td>
                <td className="py-3 px-4 font-semibold">{t.user}</td>
                <td className="py-3 px-4">{t.issue}</td>
                <td className="py-3 px-4 font-bold">{t.priority}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${t.status === "Resolved" ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40" : "bg-amber-950/60 text-amber-400 border-amber-800/40"}`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {t.status === "Open" && (
                    <button onClick={() => resolveTicket(t.id)} className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-[10px] font-bold uppercase">
                      Mark Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
