import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { ClerkClientProvider } from "@/providers/ClerkClientProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { CookieBanner } from "@/components/common/CookieBanner";

const fontSyne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
      className={`${fontSyne.variable} ${fontBody.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased selection:bg-[var(--accent-main)] selection:text-[var(--accent-foreground)]">
        <ClerkClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <GlobalHeader />
            <main className="flex-1 pt-20">{children}</main>
            <GlobalFooter />
            <CookieBanner />
          </ThemeProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
