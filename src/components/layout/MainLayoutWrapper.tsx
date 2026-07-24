"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // On welcome page (where header is hidden), flush to top. Otherwise, offset below header.
  const isWelcome = pathname === "/welcome";

  return (
    <main className={cn("flex-1", isWelcome ? "pt-0" : "pt-20")}>
      {children}
    </main>
  );
}
