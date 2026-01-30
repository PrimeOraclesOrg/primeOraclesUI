import { cn } from "@/lib/utils";

interface WorkspaceStatusBadgeProps {
  is_active: boolean;
}

const statusConfig = (is_active: boolean) => {
  if (is_active)
    return {
      label: "Активный",
      className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    };
  return {
    label: "В архиве",
    className: "bg-muted text-muted-foreground border-border",
  };
};

export function WorkspaceStatusBadge({ is_active }: WorkspaceStatusBadgeProps) {
  const config = statusConfig(is_active);

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
