"use client";

import React, { useState } from "react";
import { MessageSquare, Check, X, Trash2 } from "lucide-react";

const PENDING_REVIEWS = [
  { id: "rv1", user: "Elena R.", media: "Cybernetic Void", rating: 5, comment: "Incredible sound design!", status: "Approved" },
  { id: "rv2", user: "SpamBot99", media: "Proprietors of Chaos S3", rating: 1, comment: "Visit free-spins-domain.com for gifts!", status: "Pending" },
  { id: "rv3", user: "Marcus M.", media: "100 Seconds of Betrayal", rating: 5, comment: "Love the short-form episode length.", status: "Approved" },
];

export default function ReviewModerationAdminPage() {
  const [reviews, setReviews] = useState(PENDING_REVIEWS);

  const handleAction = (id: string, newStatus: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="space-y-6 select-none">
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
          Review Moderation & Community Safety
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Approve or flag user ratings and comments before public publication.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
        <table className="w-full text-xs text-left text-[var(--foreground)]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Review Comment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-[var(--surface-base)]/50">
                <td className="py-3 px-4 font-bold">{r.user}</td>
                <td className="py-3 px-4 text-[var(--accent-main)] font-semibold">{r.media}</td>
                <td className="py-3 px-4 font-bold">{r.rating} / 5</td>
                <td className="py-3 px-4 text-[var(--text-muted)] max-w-xs truncate">{r.comment}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${r.status === "Approved" ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40" : "bg-amber-950/60 text-amber-400 border-amber-800/40"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-1">
                  <button onClick={() => handleAction(r.id, "Approved")} className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)] text-emerald-400"><Check className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleAction(r.id, "Rejected")} className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)] text-red-400"><X className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
