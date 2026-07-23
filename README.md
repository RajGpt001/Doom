# 🎬 Doom OTT

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile%20%7C%20TV-blue.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

**Doom OTT** is a modern, high-performance, dark-themed Over-The-Top (OTT) video streaming platform designed to deliver premium movies, TV shows, anime, and live entertainment with an ultra-sleek, cinematic user interface.

---

## 🌟 Key Features

- 🍿 **Cinematic UI/UX**: Dark mode aesthetic with ambient lighting effects and responsive layouts.
- ⚡ **Adaptive Bitrate Streaming**: Smooth video playback supporting HLS/DASH across high and low bandwidths.
- 🎯 **AI-Powered Recommendations**: Personalised watchlists and content discovery engine.
- 📱 **Multi-Device Support**: Optimized for Web, Mobile web, Tablet, and Smart TV displays.
- 👥 **Profiles & Parental Control**: Multi-user profiles with PIN protection and age-based filtering.
- 🔍 **Instant Search & Filter**: Real-time content filtering by genre, release year, language, and rating.
- 📥 **Offline Download (Mobile)**: Download favorite shows for offline viewing.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) / React / Next.js |
| **Styling** | Modern Vanilla CSS, Glassmorphism, CSS Grid & Flexbox |
| **Video Player** | Video.js / HLS.js / HTML5 Video API |
| **Backend / API** | Node.js, Express / REST API |
| **Database** | MongoDB / PostgreSQL |
| **Hosting & CDN** | Vercel / Cloudflare / AWS S3 & CloudFront |

---

## 📁 Directory Structure

```text
Doom-OTT/
├── public/              # Static assets (images, icons, logos)
├── src/
│   ├── assets/          # Stylesheets, fonts, global media
│   ├── components/      # UI components (Navbar, VideoPlayer, MovieCard, Banner)
│   ├── pages/           # Application views (Home, Browse, Watch, Profile)
│   ├── services/        # API calls & video streaming logic
│   └── utils/           # Helper functions & constants
├── index.html           # Main HTML entry point
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/doom-ott.git
   cd doom-ott
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=3000
   API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 🗺️ Roadmap

- [ ] Live TV & Event Streaming support
- [ ] Watch Party (Synchronized multi-user playback)
- [ ] Subtitle & Multi-Audio track selector
- [ ] Payment gateway integration (Stripe / Razorpay)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

---

<p align="center">Made with ❤️ for cinema & streaming lovers.</p>
