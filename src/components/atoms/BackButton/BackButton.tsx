import { ChevronLeft } from "lucide-react";
import { cn } from "@/utils/helpers";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, label = "Назад", className }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mb-6 px-3 py-1.5 rounded-md border border-gold",
        className
      )}
    >
      <ChevronLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
