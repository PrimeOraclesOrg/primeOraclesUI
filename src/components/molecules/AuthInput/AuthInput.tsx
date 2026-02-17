/**
 * AuthInput Component
 *
 * Styled input for authentication forms with label and error state.
 * Modern minimal design with label above input.
 */

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  labelRight?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, labelRight, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={inputId} className="text-foreground/80 text-sm font-normal">
            {label}
          </Label>
          {labelRight}
        </div>
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            "bg-secondary/5 border-border/50 h-12 text-foreground/80 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-0 focus:ring-offset-0 transition-colors rounded-lg shadow-inner-glass",
            error && "border-destructive focus:border-destructive",
            className
          )}
          {...props}
        />
        {error && <p className="text-destructive text-sm animate-fade-in">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
