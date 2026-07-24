"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface MediaItem {
  id: string;
  title: string;
  type: "movie" | "series" | "micro-drama";
  posterUrl: string;
  bannerUrl?: string;
  videoUrl?: string;
  duration?: string;
  episodesCount?: number;
  seasonCount?: number;
  year: number;
  rating: string;
  genre: string[];
  description: string;
  badge?: string;
  trendingRank?: number;
  progressPercentage?: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPremium: boolean;
  activeProfile: string;
}

interface AppState {
  // Watchlist
  watchlist: string[]; // item IDs
  addToWatchlist: (id: string) => void;
  removeFromWatchlist: (id: string) => void;
  toggleWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;

  // Mock User Session
  user: UserSession | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  loginMockUser: () => void;
  logoutMockUser: () => void;
  continueAsGuest: () => void;

  // Cookie Consent
  cookieConsent: "pending" | "accepted" | "rejected";
  setCookieConsent: (consent: "accepted" | "rejected") => void;

  // Micro-drama Feed State
  activeShortId: string | null;
  isMuted: boolean;
  setActiveShortId: (id: string | null) => void;
  toggleMute: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Watchlist default state
      watchlist: ["m1", "s2", "sh1"],
      addToWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.includes(id)
            ? state.watchlist
            : [...state.watchlist, id],
        })),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item !== id),
        })),
      toggleWatchlist: (id) => {
        const { watchlist } = get();
        if (watchlist.includes(id)) {
          set({ watchlist: watchlist.filter((item) => item !== id) });
        } else {
          set({ watchlist: [...watchlist, id] });
        }
      },
      isInWatchlist: (id) => get().watchlist.includes(id),

      // User Session - Default Logged Out
      user: null,
      isLoggedIn: false,
      isGuest: false,
      loginMockUser: () =>
        set({
          isLoggedIn: true,
          isGuest: false,
          user: {
            id: "usr_doom_01",
            name: "Alex Vance",
            email: "alex.vance@doomott.com",
            avatarUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            isPremium: true,
            activeProfile: "Alex",
          },
        }),
      logoutMockUser: () => set({ isLoggedIn: false, isGuest: false, user: null }),
      continueAsGuest: () => set({ isLoggedIn: false, isGuest: true, user: null }),

      // Cookie Consent
      cookieConsent: "pending",
      setCookieConsent: (consent) => set({ cookieConsent: consent }),

      // Micro-drama feed
      activeShortId: null,
      isMuted: true,
      setActiveShortId: (id) => set({ activeShortId: id }),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    }),
    {
      name: "doom-ott-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        watchlist: state.watchlist,
        cookieConsent: state.cookieConsent,
        isMuted: state.isMuted,
        isLoggedIn: state.isLoggedIn,
        isGuest: state.isGuest,
        user: state.user,
      }),
    }
  )
);
