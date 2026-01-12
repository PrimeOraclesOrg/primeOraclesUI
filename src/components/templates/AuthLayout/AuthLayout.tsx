/**
 * AuthLayout Template
 *
 * Split-screen layout for all authentication flows.
 * Left side: Hero image, Right side: Form content
 * Supports single-page flow with step-based navigation.
 */

import type { ReactNode } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import authHero from "@/assets/auth-hero.jpg";
import { useAuthModal } from "@/hooks/useAuthModal";

interface AuthLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({
  children,
  showBackButton = false,
  onBack,
  title,
  subtitle,
}: AuthLayoutProps) {
  const { close } = useAuthModal();

  const handleClose = () => {
    close();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="h-screen w-full bg-background flex fixed left-0 top-0 z-20">
      {/* Left side - Hero Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={authHero}
          alt="Welcome"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {/* Bottom text */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white/70 text-sm">
            Prime Oracles • Digital Marketplace
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-background overflow-auto">
        {/* Header with close button */}
        <header className="flex items-center justify-between p-4 sm:p-6">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground gap-2 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Назад</span>
            </Button>
          ) : (
            <div />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 pb-8">
          <div className="w-full max-w-md">
            {/* Title */}
            {title && (
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground italic tracking-wide">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Form content */}
            <div className="animate-fade-in">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
