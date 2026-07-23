"use client";

import React from "react";
import { Download, Receipt } from "lucide-react";

const TRANSACTIONS = [
  { id: "INV-2026-004", date: "2026-07-01", plan: "DOOM STANDARD 4K", amount: "₹499", status: "Paid", card: "UPI (user@upi)" },
  { id: "INV-2026-003", date: "2026-06-01", plan: "DOOM STANDARD 4K", amount: "₹499", status: "Paid", card: "UPI (user@upi)" },
  { id: "INV-2026-002", date: "2026-05-01", plan: "DOOM STANDARD 4K", amount: "₹499", status: "Paid", card: "UPI (user@upi)" },
  { id: "INV-2026-001", date: "2026-04-01", plan: "DOOM BASIC", amount: "₹149", status: "Paid", card: "UPI (user@upi)" },
];

export default function PaymentHistoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 select-none">
      
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-wider flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[var(--accent-main)]" />
            Billing & Payment History
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            View past subscription receipts and download PDF invoices.
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] overflow-x-auto">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">Invoice ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="hover:bg-[var(--surface-base)]/50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-[var(--accent-main)]">{tx.id}</td>
                <td className="py-3 px-4">{tx.date}</td>
                <td className="py-3 px-4 font-semibold">{tx.plan}</td>
                <td className="py-3 px-4 text-[var(--text-muted)]">{tx.card}</td>
                <td className="py-3 px-4 font-bold">{tx.amount}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-[10px] font-bold uppercase">
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1.5 rounded bg-[var(--surface-base)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)]">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
