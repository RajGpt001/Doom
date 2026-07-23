"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const DUMMY_CLERK_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_Y2xlcmsuZG9vbW90dC5kZXYk";

export function ClerkClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || DUMMY_CLERK_KEY;

  try {
    return (
      <ClerkProvider publishableKey={clerkKey}>
        {children}
      </ClerkProvider>
    );
  } catch (error) {
    console.warn("Clerk initialization fallback active:", error);
    return <>{children}</>;
  }
}
