"use client";

import React, { useState } from "react";
import { Film, Plus, Trash2, Edit, Search, CheckCircle } from "lucide-react";
import { FULL_CATALOG_ITEMS } from "@/data/mockMedia";

export default function ContentManagementPage() {
  const [items, setItems] = useState(FULL_CATALOG_ITEMS);
  const [search, setSearch] = useState("");

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Content Management System (VOD)
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Upload, edit metadata, and publish long-form movies and original series.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Plus className="w-4 h-4" /> Add New Movie / Series
        </button>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-[var(--surface-base)] border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--foreground)] w-72">
            <Search className="w-3.5 h-3.5 mr-2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search media by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:outline-none w-full text-xs"
            />
          </div>
          <span className="text-xs text-[var(--text-muted)]">Total Titles: {filtered.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[var(--foreground)]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] uppercase font-display">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Genre</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-base)]/50">
                  <td className="py-3 px-4 font-bold flex items-center gap-2">
                    <img src={item.posterUrl} alt={item.title} className="w-8 h-10 object-cover rounded" />
                    <span>{item.title}</span>
                  </td>
                  <td className="py-3 px-4 uppercase text-[10px] font-extrabold">{item.type}</td>
                  <td className="py-3 px-4 text-[var(--text-muted)]">{item.genre.join(", ")}</td>
                  <td className="py-3 px-4">{item.year}</td>
                  <td className="py-3 px-4 font-bold text-[var(--accent-main)]">{item.rating}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)] hover:border-[var(--accent-main)]">
                      <Edit className="w-3.5 h-3.5 text-sky-400" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 rounded bg-[var(--surface-base)] border border-[var(--border)] hover:border-red-500">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
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
