"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Shield, HelpCircle, FileText, Globe, Mail, ChevronLeft } from "lucide-react";

const LEGAL_PAGES: Record<
  string,
  { title: string; subtitle: string; icon: any; content: string[] }
> = {
  faq: {
    title: "Help Center & FAQ",
    subtitle: "Frequently asked questions about streaming, billing, and supported devices.",
    icon: HelpCircle,
    content: [
      "1. What is Doom OTT? Doom OTT is a premium streaming platform offering 4K feature films, original series, and vertical 1-minute micro-dramas.",
      "2. How does the 1-Minute Micro-Drama Feed work? Our shorts section is organized into chaptered series (e.g. Episode 1 of 8) with a mini progress rail and 3D card transitions.",
      "3. Can I cancel my subscription anytime? Yes. You can cancel or upgrade your plan anytime under Plans & Billing.",
      "4. What video quality is supported? We support up to 4K HDR10+ and Dolby Vision with Spatial Audio on compatible screens.",
    ],
  },
  contact: {
    title: "Contact Us & Support",
    subtitle: "Get in touch with our global customer support team.",
    icon: Mail,
    content: [
      "Customer Support Email: support@doomott.com",
      "Media & Press Inquiries: press@doomott.com",
      "Global HQ: Doom OTT Inc., 100 Cyberpunk Way, Suite 404, San Francisco, CA 94107",
      "24/7 Live Chat is available for Premium Ultra subscribers.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "How Doom OTT protects and respects your personal data.",
    icon: Shield,
    content: [
      "Data Collection: We collect essential account credentials and watch progress to deliver personalized recommendations.",
      "No Third-Party Ad Tracking: Doom OTT does not sell or share user data with third-party advertisers.",
      "Encryption & Security: All payment credentials and account tokens are protected via TLS 1.3 encryption.",
      "User Rights: You can request account deletion or data exports anytime under Account Settings.",
    ],
  },
  terms: {
    title: "Terms of Service",
    subtitle: "User agreement and terms of platform access.",
    icon: FileText,
    content: [
      "License: Doom OTT grants subscribers a non-exclusive, non-transferable license to view digital content.",
      "Usage Limits: Account sharing is limited according to the simultaneous screen count of your chosen plan.",
      "Prohibited Acts: Unauthorized recording, redistribution, or reverse engineering of media streams is strictly prohibited.",
    ],
  },
  about: {
    title: "About Doom OTT",
    subtitle: "Engineered for cinema lovers and vertical short-form enthusiasts.",
    icon: Globe,
    content: [
      "Doom OTT was founded with a mission to bridge high-end 4K long-form cinema with high-energy vertical micro-dramas.",
      "Our flat, matte design language prioritizes clarity, editorial typography, and high-contrast visuals over glossy distractions.",
      "Built with Next.js, Framer Motion, and Tailwind CSS for peak performance across web, mobile, and smart TVs.",
    ],
  },
};

export default function LegalPageTemplate() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "faq";

  const pageData = LEGAL_PAGES[slug] || LEGAL_PAGES["faq"];
  const Icon = pageData.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none">
      
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)] hover:border-[var(--accent-main)] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="border-b border-[var(--border)] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-[var(--accent-main)]" />
          <h1 className="font-display font-black uppercase text-2xl sm:text-4xl text-[var(--foreground)] tracking-wider">
            {pageData.title}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          {pageData.subtitle}
        </p>
      </div>

      {/* Shared Long-Form Text Layout */}
      <div className="p-6 sm:p-10 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6">
        {pageData.content.map((paragraph, idx) => (
          <p key={idx} className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

    </div>
  );
}
