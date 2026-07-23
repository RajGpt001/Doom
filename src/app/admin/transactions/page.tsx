"use client";

import React from "react";
import { Receipt, Search, Download } from "lucide-react";

const ADMIN_TX = [
  { id: "TX-9901", user: "Alex Vance", plan: "Standard 4K", amount: "$12.99", gateway: "Stripe", status: "Succeeded", time: "10 mins ago" },
  { id: "TX-9902", user: "Elena Rostova", plan: "Premium Ultra", amount: "$17.99", gateway: "Razorpay", status: "Succeeded", time: "42 mins ago" },
  { id: "TX-9903", user: "Marcus Miller", plan: "Basic", amount: "$6.99", gateway: "PayPal", status: "Failed", time: "2 hours ago" },
];

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Payment & Transaction Watch List
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Monitor live gateway events, transaction status, and payment logs.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] overflow-x-auto">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Subscriber</th>
              <th className="py-3 px-4">Gateway</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {ADMIN_TX.map((tx) => (
              <tr key={tx.id} className="hover:bg-[var(--surface-base)]/50">
                <td className="py-3 px-4 font-mono font-bold text-[var(--accent-main)]">{tx.id}</td>
                <td className="py-3 px-4 font-semibold">{tx.user}</td>
                <td className="py-3 px-4 text-[var(--text-muted)]">{tx.gateway}</td>
                <td className="py-3 px-4 font-bold">{tx.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${tx.status === "Succeeded" ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40" : "bg-red-950/60 text-red-400 border-red-800/40"}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[var(--text-muted)]">{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
