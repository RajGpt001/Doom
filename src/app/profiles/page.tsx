"use client";

import React, { useState } from "react";
import { Plus, Edit, Shield, Check, User } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
  isKids: boolean;
}

const MOCK_PROFILES: Profile[] = [
  { id: "p1", name: "Alex Vance", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", isKids: false },
  { id: "p2", name: "Elena", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", isKids: false },
  { id: "p3", name: "Doom Kids", avatarUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=200&q=80", isKids: true },
];

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState("p1");
  const [isEditing, setIsEditing] = useState(false);

  const [newProfileName, setNewProfileName] = useState("");
  const [isNewKids, setIsNewKids] = useState(false);

  const handleAddProfile = () => {
    if (!newProfileName.trim()) return;
    const newP: Profile = {
      id: "p_" + Date.now(),
      name: newProfileName,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isKids: isNewKids,
    };
    setProfiles([...profiles, newP]);
    setNewProfileName("");
    setIsNewKids(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 select-none text-center">
      
      <div className="space-y-2">
        <h1 className="font-display font-black uppercase text-3xl sm:text-4xl text-[var(--foreground)] tracking-wider">
          Who's Watching Doom OTT?
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Switch user profiles or manage recommendations for family members.
        </p>
      </div>

      {/* Profiles Grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {profiles.map((p) => {
          const isActive = activeProfileId === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setActiveProfileId(p.id)}
              className="group flex flex-col items-center space-y-3 cursor-pointer"
            >
              <div
                className={cn(
                  "relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border-2 transition-all p-1 bg-[var(--surface-elevated)]",
                  isActive
                    ? "border-[var(--accent-main)] scale-105 shadow-xl"
                    : "border-[var(--border)] group-hover:border-[var(--text-muted)]"
                )}
              >
                <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover rounded" />
                {p.isKids && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-black uppercase bg-[var(--micro-drama-accent)] text-[var(--micro-drama-bg)] rounded">
                    KIDS
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-[var(--foreground)] group-hover:text-[var(--accent-main)]">
                  {p.name}
                </span>
                {isActive && <Check className="w-3.5 h-3.5 text-[var(--accent-main)]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Profile Section */}
      <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] max-w-md mx-auto space-y-4 text-left">
        <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
          <Plus className="w-4 h-4 text-[var(--accent-main)]" />
          Add New User Profile
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Profile Name (e.g. Sam)"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:border-[var(--accent-main)] focus:outline-none"
          />

          <label className="flex items-center gap-2 text-xs text-[var(--text-muted)] cursor-pointer">
            <input
              type="checkbox"
              checked={isNewKids}
              onChange={(e) => setIsNewKids(e.target.checked)}
              className="rounded accent-[var(--accent-main)]"
            />
            <span>Enable Kids Profile (Restricts to PG content)</span>
          </label>

          <button
            onClick={handleAddProfile}
            className="w-full py-2.5 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
          >
            Create Profile
          </button>
        </div>
      </div>

    </div>
  );
}
