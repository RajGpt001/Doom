"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Flush pages that should start right at the top (top:0) without a top padding gap
  const isFlushPage = pathname === "/" || pathname === "/home" || pathname === "/welcome";

  return (
    <main className={cn("flex-1", isFlushPage ? "pt-0" : "pt-20")}>
      {children}
    </main>
  );
}
