<div align="center">

# 🎬 DOOM OTT
### Premium Streaming Platform & Vertical Micro-Drama Feed

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-E10098?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22C55E?style=for-the-badge)](https://recharts.org/)

<p align="center">
  <b>Doom OTT</b> is a next-generation Over-The-Top (OTT) video streaming web application designed with <b>Next.js 15 App Router</b>, <b>Tailwind CSS v4</b>, and <b>Framer Motion</b>.
  <br />
  Features a dual-experience architecture: <b>4K Cinematic VOD Catalog</b> alongside a signature <b>Vertical 3D Micro-Drama Feed</b>.
</p>

</div>

---

## ⚡ Key Highlights & Core Features

### 🍿 Consumer Streaming Experience
- ⚡ **Signature Vertical Short-Form Feed (`/shorts`)**:
  - Differentiated **Chaptered Presentation** (*Episode 1 of 8*) with top progress rails.
  - Interactive **Framer Motion 3D card-flip perspective transforms** (`rotateX`).
  - Automatic `prefers-reduced-motion` accessibility support (2D smooth opacity fallback).
  - Overlay action controls: Like counter, Watchlist bookmarking, Link sharing toast, Mute toggle, and Next Ep CTA.
- 🎨 **Matte Design System Philosophy**:
  - **Zero Glossy / No Skeuomorphic Blur Sheen**. Confident, high-contrast matte obsidian charcoal (`#0B0B0C`) with Electric Amber (`#FF9F1C`) and Acid Lime (`#CCFF00`) kinetic accents.
- 🌓 **Dynamic Theme Engine**:
  - Dual obsidian dark mode and warm off-white matte light mode (`#F8F7F4`) with custom font hierarchy (`Syne` display + `Plus Jakarta Sans` body).
- 🔐 **Clerk Authentication Integration**:
  - Email/Password, Email/Phone OTP, and Google Social Login pre-configured with fallback test keys for trivial backend swap-in.
- 📱 **100% Responsive Coverage**:
  - Desktop navigation + mobile hamburger drawer ([GlobalHeader.tsx](file:///c:/Users/Raj%20Gupta/OneDrive/Desktop/Doom/src/components/layout/GlobalHeader.tsx)).

---

### 🛡️ 18-Module Admin Management Console (`/admin/*`)
Dense, utility-first internal management dashboard powered by **Recharts**:

| Module | Route | Key Purpose |
| :--- | :--- | :--- |
| **Admin Login** | `/admin/login` | Secure internal access portal |
| **Dashboard Overview** | `/admin/dashboard` | **Recharts** Area & Bar chart metrics (Revenue & Growth) |
| **Content Management** | `/admin/content` | VOD movie and original series CRUD table |
| **Live Channels** | `/admin/live-channels` | IPTV RTMP/HLS stream status monitors |
| **EPG Scheduling** | `/admin/epg` | Electronic Program Guide schedule builder |
| **Categories & Genres** | `/admin/genres` | Genre taxonomy & content counts |
| **Banners & Sliders** | `/admin/banners` | Homepage hero carousel priority ordering |
| **User Management** | `/admin/users` | Account suspension & tier management |
| **Subscription Plans** | `/admin/plans` | Pricing tiers & screen limitation controls |
| **Transaction Log** | `/admin/transactions` | Live payment event monitor (Stripe, Razorpay) |
| **Payment Gateways** | `/admin/payment-gateways` | Stripe & Razorpay API credentials config |
| **Coupons & Discounts** | `/admin/coupons` | Promo code generator & usage tracking |
| **Push Notifications** | `/admin/notifications` | Broadcast push notification dispatcher |
| **Reports & Analytics** | `/admin/reports` | **Recharts** Pie & Bar chart financial analytics |
| **Review Moderation** | `/admin/reviews` | Community comment moderation & spam filter |
| **Roles & Permissions** | `/admin/roles` | Sub-admin RBAC permission matrix |
| **CMS Page Editor** | `/admin/cms` | WYSIWYG legal policy & TOS document editor |
| **Support Help Desk** | `/admin/support` | Ticket resolution & customer inquiry desk |

---

## 🛠️ Technology Stack

```text
Doom OTT Architecture
├── Framework       : Next.js 15.1 (App Router) + React 19 + TypeScript 5
├── Styling         : Tailwind CSS v4 (@import "tailwindcss") + Custom CSS Tokens
├── Motion          : Framer Motion 11.18.2 (3D transforms & layout animations)
├── State           : Zustand 5.0 (Persisted watchlist, mute state, cookie consent)
├── Auth            : Clerk (@clerk/nextjs)
├── Charts          : Recharts 2.15
└── Icons           : Lucide React
```

---

## 🗺️ Application Directory Map

```text
src/
├── app/
│   ├── page.tsx               # Homepage with HeroCarousel & SectionRows
│   ├── browse/page.tsx        # Filterable media grid with animated layout
│   ├── search/page.tsx        # Live-filtering search bar with debounced input
│   ├── title/[id]/page.tsx    # Content detail page with 4K trailer hero
│   ├── shorts/page.tsx        # Vertical 3D micro-drama chaptered feed
│   ├── welcome/page.tsx       # Entry flow (Splash -> Onboarding -> Auth)
│   ├── watchlist/page.tsx     # Unified personal watchlist grid
│   ├── plans/page.tsx         # Tiered subscription pricing cards & comparison
│   ├── checkout/page.tsx      # PCI-DSS checkout form with Suspense
│   ├── billing/page.tsx       # Transaction history with PDF receipt downloads
│   ├── profiles/page.tsx      # Multi-profile manager with Kids profile flag
│   ├── account/page.tsx       # Security credentials & linked Clerk socials
│   ├── parental-controls/     # 4-Digit PIN-gated maturity rating restrictions
│   ├── notifications/         # Activity alert feed & notification preferences
│   ├── reviews/               # Rating & review history
│   ├── legal/[slug]/          # Shared legal text template (FAQ, Privacy, Terms)
│   └── admin/                 # 18-Module Administrative Console
│       ├── layout.tsx         # Admin sidebar shell + topbar
│       ├── dashboard/page.tsx # Recharts revenue trajectory & subscriber metrics
│       ├── content/page.tsx   # Media catalog CRUD table
│       └── ...                # 16 additional administrative routes
├── components/
│   ├── cards/                 # LongFormCard & ShortFormCard components
│   ├── common/                # LogoPlaceholder, ThemeToggle, CookieBanner
│   ├── entry/                 # SplashScreen, OnboardingSlides, AuthTabs
│   ├── home/                  # HeroCarousel spotlight
│   ├── layout/                # GlobalHeader & GlobalFooter
│   └── shorts/                # ShortPlayerCard with 3D card flips & progress rail
├── data/
│   └── mockMedia.ts           # Extended media catalog & chaptered shorts dataset
└── store/
    └── useAppStore.ts         # Zustand persisted store
```

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/RajGpt001/Doom.git
cd Doom
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the consumer platform or [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard) for the admin console.

### 3. Production Build
```bash
npm run build
```

---

<div align="center">
  <sub>Built with ❤️ for cinema lovers and vertical short-form enthusiasts.</sub>
</div>
