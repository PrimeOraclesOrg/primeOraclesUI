/**
 * CodeInput Component
 *
 * 8-digit verification code input.
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function CodeInput({
  length = 8,
  value,
  onChange,
  error,
  disabled = false,
}: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  const handleChange = useCallback(
    (index: number, char: string) => {
      if (disabled) return;

      // Only allow digits
      const digit = char.replace(/\D/g, "").slice(-1);
      const newValue = value.split("");
      newValue[index] = digit;
      const result = newValue.join("").slice(0, length);
      onChange(result);

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, onChange, length, disabled]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, length, disabled]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (disabled) return;

      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      onChange(pasted);

      // Focus last filled input or first empty
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    },
    [onChange, length, disabled]
  );

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
            disabled={disabled}
            className={cn(
              "w-10 h-12 sm:w-11 sm:h-14 text-center text-xl font-semibold rounded-lg border bg-secondary/30 border-border/50 text-foreground transition-all duration-200 outline-none focus:border-primary/50",
              focused === index && "border-primary/50",
              error && "border-destructive",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>
      {error && <p className="text-destructive text-sm text-center animate-fade-in">{error}</p>}
    </div>
  );
}
