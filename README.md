# 🎬 Doom OTT — Next-Gen Streaming Platform & Micro-Drama Feed

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-f00.svg?style=flat-square)](https://www.framer.com/motion/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF.svg?style=flat-square)](https://clerk.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22c55e.svg?style=flat-square)](https://recharts.org/)

**Doom OTT** is a premium Over-The-Top (OTT) streaming platform engineered with Next.js 15 App Router, TypeScript, Framer Motion, and Tailwind CSS. It introduces a unique hybrid format combining 4K feature films & series with a **signature 1-minute vertical micro-drama feed**.

---

## 🚀 Key Highlights & Architectural Features

- ⚡ **Signature Vertical Short-Form Feed (`/shorts`)**:
  - Differentiated chaptered presentation (*Episode 1 of 8*) with a mini progress rail across the top.
  - 3D Framer Motion perspective transforms (`rotateX`) with `prefers-reduced-motion` accessibility support.
  - Interactive overlay controls: Likes, Watchlist bookmarking, Link sharing, Mute toggle, and Next Ep quick navigation.
- 🎨 **Strict Matte Design Philosophy**:
  - **No glossy, shiny, or skeuomorphic panels**. Confident obsidian charcoal matte base (`#0B0B0C`) with Electric Amber (`#FF9F1C`) and Acid Lime (`#CCFF00`) kinetic accents.
- 🔐 **Clerk Powered Authentication**:
  - Email/password, OTP code verification, and Google social sign-in pre-wired with fallback test key support for seamless backend swap-in.
- 🌐 **Comprehensive 18-Module Admin Console (`/admin/dashboard`)**:
  - Utility-first administrative dashboard covering Content Management, EPG Scheduling, Live IPTV Streams, User Suspension, Pricing Controls, Recharts Revenue Analytics, Gateways, and Support Desk.
- 🌓 **Double Theme Engine**:
  - Dark mode obsidian charcoal base + Light mode warm off-white matte base (`#F8F7F4`) with custom font pairing (`Syne` display + `Plus Jakarta Sans` body).

---

## 🛠️ Stack & Dependencies

- **Framework**: Next.js 15.1 (App Router) with React 19 & TypeScript 5
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`) & Vanilla CSS design tokens
- **Animations**: Framer Motion 11.18.2
- **State Management**: Zustand 5.0 (Persisted watchlist, player mute, cookie consent)
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Analytics & Data Vis**: Recharts 2.15
- **Icons**: Lucide React

---

## 📁 Application Routes & Structure

### Consumer Platform (Parts 0–5)
- `/` — Homepage with hero carousel spotlight, continue watching, & category rows
- `/browse` — Filterable catalog grid with animated layout transitions
- `/search` — Live-filtering search bar with debounced input and recent queries
- `/title/[id]` — Content detail view with 4K trailer modal, cast, & related titles
- `/shorts` — Signature 3D chaptered vertical short-form feed
- `/welcome` — Entry flow (animated splash -> swipeable onboarding -> auth tabs)
- `/watchlist` — Personal saved media grid with category filter pills
- `/plans` — Tiered subscription pricing cards & detailed feature table
- `/checkout` — PCI-DSS style checkout form (Credit Card, UPI, NetBanking) with Suspense
- `/billing` — Transaction history table with downloadable PDF receipts
- `/profiles` — Multi-profile switcher & Kids profile restriction creator
- `/account` — Email, password, & social identity management
- `/parental-controls` — 4-Digit PIN-gated maturity rating restrictions
- `/notifications` — Activity alert log & preference toggles
- `/reviews` — Rating history & user comments
- `/legal/[slug]` — Shared text template (`/legal/faq`, `/legal/privacy`, `/legal/terms`, `/legal/about`, `/legal/contact`)

### Admin Management Console (Part 6)
- `/admin/login` — Administrative authentication entry point
- `/admin/dashboard` — Overview with Recharts revenue trajectory & subscriber metrics
- `/admin/content` — VOD content catalog CRUD table
- `/admin/live-channels` — Live RTMP/HLS channel stream manager
- `/admin/epg` — Electronic Program Guide schedule matrix
- `/admin/genres` — Category & genre taxonomy editor
- `/admin/banners` — Homepage hero banner slider ordering
- `/admin/users` — Subscriber account suspension & plan tier editor
- `/admin/plans` — Plan pricing & simultaneous screen limit editor
- `/admin/transactions` — Live gateway payment event watch list
- `/admin/payment-gateways` — Stripe & Razorpay API key configuration
- `/admin/coupons` — Promo code & discount generator
- `/admin/notifications` — Instant push notification broadcast dispatcher
- `/admin/reports` — Recharts revenue analytics & watch-hour distribution
- `/admin/reviews` — Community review approval & spam moderation
- `/admin/roles` — Sub-admin RBAC role-based access control permissions
- `/admin/cms` — Legal policy document editor
- `/admin/support` — Customer support ticket help desk

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Export Verification
```bash
npm run build
```

---

<p align="center">Crafted with precision for cinema lovers & vertical short-form enthusiasts.</p>
