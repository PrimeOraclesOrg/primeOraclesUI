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
import { SpotLightPacmanShape } from "@/assets/graphics/SpotLightPacmanShape";
import { BrandLogo } from "@/assets/icons";

interface AuthLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  onLogout?: () => void;
}

export function AuthLayout({
  children,
  showBackButton = false,
  onBack,
  onClose,
  title,
  subtitle,
  onLogout,
}: AuthLayoutProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="h-screen w-full bg-background flex fixed left-0 top-0 z-20">
      {/* Left side - Hero Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <BrandLogo className="absolute top-6 left-6 text-accent" />
        <img
          src="/img/illustrations/mascot_1.avif"
          alt="Welcome"
          className="absolute inset-0 w-full h-full object-cover object-right-top"
        />
        {/* Bottom text */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white/70 text-sm">Prime Oracles • Digital Marketplace</p>
        </div>

        {/* Backgound light */}
        <SpotLightPacmanShape className="absolute -z-10 top-[-300px] right-[200px] rotate-[75deg] text-[#FF6200] opacity-5 blur-[96px]" />
        <SpotLightPacmanShape className="absolute -z-10 bottom-[-250px] right-[200px] rotate-[110deg] text-[#FF8800] opacity-10 blur-[96px]" />
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
          <div>
            {onLogout && (
              <Button
                variant="outline"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md"
                aria-label="Закрыть"
              >
                Выйти
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 pb-8">
          <div className="w-full max-w-lg">
            {/* Title */}
            {title && (
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground italic tracking-wide">
                  {title}
                </h1>
                {subtitle && <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>}
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
