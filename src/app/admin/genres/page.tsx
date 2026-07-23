"use client";

import React, { useState } from "react";
import { Layers, Plus, Trash2, Tag } from "lucide-react";

const INITIAL_GENRES = [
  { id: "g1", name: "Cyberpunk", count: 24, status: "Active" },
  { id: "g2", name: "Sci-Fi", count: 48, status: "Active" },
  { id: "g3", name: "Suspense", count: 32, status: "Active" },
  { id: "g4", name: "Micro-Drama ⚡", count: 16, status: "Active" },
  { id: "g5", name: "Horror", count: 18, status: "Active" },
  { id: "g6", name: "Action", count: 52, status: "Active" },
];

export default function GenresPage() {
  const [genres, setGenres] = useState(INITIAL_GENRES);
  const [newGenre, setNewGenre] = useState("");

  const handleAdd = () => {
    if (!newGenre.trim()) return;
    setGenres([...genres, { id: "g_" + Date.now(), name: newGenre, count: 0, status: "Active" }]);
    setNewGenre("");
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            Category & Genre Taxonomy
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Manage genre tags, filters, and short-form categories.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 max-w-md">
        <h3 className="font-display font-bold text-xs uppercase text-[var(--foreground)]">Add New Category Tag</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Genre Name (e.g. Noir)"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none"
          />
          <button onClick={handleAdd} className="px-4 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs font-bold uppercase">
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((g) => (
          <div key={g.id} className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[var(--accent-main)]" />
              <span className="font-display font-bold text-xs uppercase text-[var(--foreground)]">{g.name}</span>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono">{g.count} titles</span>
          </div>
        ))}
      </div>
    </div>
  );
}
