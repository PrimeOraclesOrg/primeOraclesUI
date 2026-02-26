import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { ProductCategory } from "@/types";
import { cn } from "@/utils";
import { BottomSheet } from "@/components/atoms";

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

  const activeCategory = categories?.find((c) => c.code === currentCategoryCode);
  const subcategories = activeCategory?.subcategories ?? [];

  return (
    <BottomSheet
      isOpen={isOpen}
      title="Фильтры"
      onClose={onClose}
      footer={
        <Button
          onClick={onClose}
          className="w-full gold-gradient text-primary-foreground py-6 rounded-xl text-base font-semibold"
        >
          Применить
        </Button>
      }
    >
      {/* Categories */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">КАТЕГОРИЯ</p>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
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
    </BottomSheet>
  );
}
