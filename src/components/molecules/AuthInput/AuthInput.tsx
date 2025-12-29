/**
 * AuthInput Component
 * 
 * Styled input for authentication forms with error state.
 */

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId} className="text-muted-foreground text-sm">
          {label}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            "bg-secondary/50 border-border h-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-colors",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-destructive text-sm animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
