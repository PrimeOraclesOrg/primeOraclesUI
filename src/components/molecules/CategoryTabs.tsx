import { cn } from "@/utils/helpers";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-6 border-b border-border pb-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "text-sm font-medium transition-colors relative pb-3 -mb-3",
            activeCategory === category 
              ? "text-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {category}
          {activeCategory === category && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
