import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface WorkspaceStatusBadgeProps {
  isActive: boolean;
}

export function WorkspaceStatusBadge({ isActive }: WorkspaceStatusBadgeProps) {
  const config = useMemo(() => {
    if (isActive)
      return {
        label: "Активный",
        className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      };
    return {
      label: "В архиве",
      className: "bg-muted text-muted-foreground border-border",
    };
  }, [isActive]);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
