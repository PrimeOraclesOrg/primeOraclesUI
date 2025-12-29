/**
 * AuthLayout Template
 * 
 * Shared layout for all authentication pages.
 * Centered card design with dark background.
 */

import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl shadow-black/20 animate-scale-in">
          {children}
        </div>
      </div>
    </div>
  );
}
