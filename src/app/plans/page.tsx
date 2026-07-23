"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  resolution: string;
  devicesCount: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "DOOM BASIC",
    price: "₹149",
    billingPeriod: "per month",
    resolution: "1080p Full HD",
    devicesCount: 1,
    features: [
      "Access to all Movies & Series",
      "Full Micro-Dramas 1-Min Feed ⚡",
      "1 Screen at a time",
      "Standard Audio",
    ],
  },
  {
    id: "standard-4k",
    name: "DOOM STANDARD 4K",
    price: "₹499",
    billingPeriod: "per month",
    resolution: "4K Ultra HD + HDR10",
    devicesCount: 2,
    badge: "MOST POPULAR",
    isPopular: true,
    features: [
      "Access to all Movies & Series",
      "Full Micro-Dramas 1-Min Feed ⚡",
      "2 Screens simultaneously",
      "4K Ultra HD resolution",
      "Dolby Digital 5.1 Audio",
      "Download on 2 mobile devices",
    ],
  },
  {
    id: "premium-ultra",
    name: "DOOM PREMIUM ULTRA",
    price: "₹799",
    billingPeriod: "per month",
    resolution: "4K HDR10+ & Dolby Vision",
    devicesCount: 4,
    badge: "BEST VALUE",
    features: [
      "Access to all Movies & Series",
      "Unlimited Micro-Dramas ⚡",
      "4 Screens simultaneously",
      "4K HDR10+ & Dolby Vision",
      "Dolby Atmos Spatial Audio",
      "Download on 6 devices",
      "Priority Customer Support",
    ],
  },
];

export default function SubscriptionPlansPage() {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState("standard-4k");

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    router.push(`/checkout?plan=${planId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 select-none">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 text-xs font-black uppercase tracking-widest bg-[var(--accent-subtle)] text-[var(--accent-main)] border border-[var(--accent-main)]/30 rounded-sm inline-block">
          TRANSPARENT PRICING
        </span>
        <h1 className="font-display font-black uppercase text-3xl sm:text-5xl text-[var(--foreground)] tracking-wider">
          Choose Your Streaming Plan
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          Stream movies, originals, and vertical micro-dramas in 4K HDR. Cancel or switch plans anytime with no extra fees.
        </p>
      </div>

      {/* Tiered Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {PLANS.map((plan) => {
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={cn(
                "relative rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer bg-[var(--surface-elevated)] border-2",
                plan.isPopular
                  ? "border-[var(--accent-main)] shadow-xl"
                  : "border-[var(--border)] hover:border-[var(--text-muted)]"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-[var(--foreground)]">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display font-black text-3xl sm:text-4xl text-[var(--foreground)]">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{plan.billingPeriod}</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Max Quality:</span>
                    <span>{plan.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Screens:</span>
                    <span>{plan.devicesCount} Simultaneously</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs text-[var(--foreground)]">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[var(--accent-main)] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan.id);
                }}
                className={cn(
                  "w-full mt-8 py-3 rounded font-display font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md",
                  plan.isPopular
                    ? "bg-[var(--accent-main)] text-[var(--accent-foreground)] hover:brightness-110"
                    : "bg-[var(--surface-base)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-main)]"
                )}
              >
                Select {plan.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* Matte Comparison Table */}
      <div className="p-6 sm:p-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6">
        <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-[var(--foreground)] border-b border-[var(--border)] pb-3">
          Detailed Feature Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[var(--foreground)] border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] uppercase font-display">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">Basic</th>
                <th className="py-3 px-4">Standard 4K</th>
                <th className="py-3 px-4 text-[var(--accent-main)]">Premium Ultra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/60">
              <tr>
                <td className="py-3 px-4 font-semibold">Monthly Price</td>
                <td className="py-3 px-4">₹149</td>
                <td className="py-3 px-4">₹499</td>
                <td className="py-3 px-4 text-[var(--accent-main)] font-bold">₹799</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Video Resolution</td>
                <td className="py-3 px-4">1080p HD</td>
                <td className="py-3 px-4">4K Ultra HD</td>
                <td className="py-3 px-4">4K HDR10+ / Dolby Vision</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Audio Output</td>
                <td className="py-3 px-4">Stereo 2.0</td>
                <td className="py-3 px-4">Dolby 5.1</td>
                <td className="py-3 px-4">Dolby Atmos Spatial Audio</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Micro-Dramas Feed ⚡</td>
                <td className="py-3 px-4">Unlimited</td>
                <td className="py-3 px-4">Unlimited</td>
                <td className="py-3 px-4">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Simultaneous Streams</td>
                <td className="py-3 px-4">1 Device</td>
                <td className="py-3 px-4">2 Devices</td>
                <td className="py-3 px-4">4 Devices</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
