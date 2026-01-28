import { cn } from "@/lib/utils";
import type { WorkspaceProductStatus } from "@/types";

interface WorkspaceStatusBadgeProps {
  status: WorkspaceProductStatus;
}

const statusConfig: Record<WorkspaceProductStatus, { label: string; className: string }> = {
  active: {
    label: "Активный",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  archived: {
    label: "В архиве",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function WorkspaceStatusBadge({ status }: WorkspaceStatusBadgeProps) {
  const config = statusConfig[status];

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
