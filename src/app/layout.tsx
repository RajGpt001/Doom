import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { CookieBanner } from "@/components/common/CookieBanner";

const headingFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOOM OTT | Premium Movies & Vertical Micro-Dramas",
  description:
    "Experience next-generation cinema streaming and 1-minute vertical web-series with DOOM OTT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable}`}
      style={{ "--font-display": "var(--font-heading)" } as React.CSSProperties}
    >
      <body className="min-h-screen flex flex-col antialiased bg-[var(--background)] text-[var(--text-primary)] selection:bg-[var(--primary)] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <GlobalHeader />
          <main className="flex-1 pt-20">{children}</main>
          <GlobalFooter />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
