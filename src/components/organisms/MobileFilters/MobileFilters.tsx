import { X, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { ProductCategory } from "@/types";
import { cn } from "@/utils";

interface MobileFiltersProps {
  isOpen: boolean;
  categories: ProductCategory[];
  currentCategoryCode: string;
  currentSubCategoryCode: string;
  onCategoryChange: (categoryCode: string) => void;
  onSubCategoryChange: (subCategoryCode: string) => void;
  onClose: () => void;
}

export function MobileFilters({
  isOpen,
  categories,
  currentCategoryCode,
  currentSubCategoryCode,
  onCategoryChange,
  onSubCategoryChange,
  onClose,
}: MobileFiltersProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const activeCategory = categories?.find((c) => c.code === currentCategoryCode);
  const subcategories = activeCategory?.subcategories ?? [];

  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[90dvh] bg-card rounded-t-2xl border-t border-border flex flex-col animate-slide-up">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4">
          <h2 className="text-lg font-bold text-foreground">Фильтры</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
          {/* Categories */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">
              КАТЕГОРИЯ
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.code}
                  onClick={() => onCategoryChange(category.code)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    currentCategoryCode === category.code
                      ? "gold-gradient text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-secondary text-foreground"
                  )}
                >
                  {t(`product:category.${category.code}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {currentCategoryCode && subcategories.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">ТИП</p>
              <div className="rounded-xl bg-secondary/50 overflow-hidden">
                {/* "All" option */}
                <button
                  onClick={() => onSubCategoryChange("")}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm border-b border-border/50 transition-colors",
                    !currentSubCategoryCode ? "text-accent font-medium" : "text-foreground"
                  )}
                >
                  <span>Все</span>
                  {!currentSubCategoryCode ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                {subcategories.map((subCategory, index) => (
                  <button
                    key={subCategory.code}
                    onClick={() => onSubCategoryChange(subCategory.code)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors",
                      index < subcategories.length - 1 && "border-b border-border/50",
                      currentSubCategoryCode === subCategory.code
                        ? "text-accent font-medium"
                        : "text-foreground"
                    )}
                  >
                    <span>{t(`product:subCategory.${subCategory.code}`)}</span>
                    {currentSubCategoryCode === subCategory.code ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky apply button */}
        <div className="px-4 pb-6 pt-2 border-t border-border">
          <Button
            onClick={onClose}
            className="w-full gold-gradient text-primary-foreground py-6 rounded-xl text-base font-semibold"
          >
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
}
