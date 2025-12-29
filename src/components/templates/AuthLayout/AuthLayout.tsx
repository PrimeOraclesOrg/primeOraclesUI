/**
 * AuthLayout Template
 *
 * Shared layout for all authentication pages.
 * Centered card design with dark background and skip option.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backPath?: string;
}

export function AuthLayout({
  children,
  showBackButton = false,
  backPath = "/login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Top bar with skip option */}
      <header className="w-full flex items-center justify-between p-4 sm:p-6">
        {showBackButton ? (
          <Link to={backPath}>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Назад</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <span className="hidden sm:inline">Продолжить как гость</span>
            <span className="sm:hidden">Пропустить</span>
            <X className="h-4 w-4" />
          </Button>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8 sm:pb-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xl shadow-black/20 animate-scale-in">
            {children}
          </div>
        </div>
      </main>

      {/* Bottom spacer for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
