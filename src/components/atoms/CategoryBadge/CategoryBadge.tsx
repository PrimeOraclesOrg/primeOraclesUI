import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColors = {
  "Soft/Bot": "bg-badge-blue",
  Курс: "bg-badge-pink",
  "Цифровой материал": "bg-badge-aqua",
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        "text-secondary-foreground border border-border",
        categoryColors[category] || "bg-badge",
        className
      )}
    >
      {category}
    </span>
  );
}
