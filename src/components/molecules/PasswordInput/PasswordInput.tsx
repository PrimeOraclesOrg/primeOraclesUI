/**
 * PasswordInput Component
 *
 * Password input with visibility toggle for authentication forms.
 * Modern minimal design matching AuthInput styling.
 */

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string;
  error?: string;
  labelRight?: React.ReactNode;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, labelRight, className, id, disabled, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    const toggleVisibility = () => {
      if (!disabled) {
        setIsVisible((prev) => !prev);
      }
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={inputId} className="text-foreground text-sm font-normal">
            {label}
          </Label>
          {labelRight}
        </div>
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={isVisible ? "text" : "password"}
            disabled={disabled}
            className={cn(
              "bg-secondary/5 border-border/50 h-12 pr-12 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-0 focus:ring-offset-0 transition-colors rounded-lg shadow-inner-glass",
              error && "border-destructive focus:border-destructive",
              className
            )}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleVisibility}
            disabled={disabled}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 text-muted-foreground hover:text-foreground hover:bg-transparent"
            tabIndex={-1}
            aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}
          >
            {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
        {error && <p className="text-destructive text-sm animate-fade-in">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
