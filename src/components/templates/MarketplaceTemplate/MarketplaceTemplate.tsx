import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { ProductCard, SearchBar } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import type { ProductCategory, PublicProductCard } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import { MarketSearchFormData } from "@/utils/validators/marketSearch";
import { cn } from "@/utils";
import { marketSortOptions } from "@/data/market";
import { MobileFilters } from "@/components/organisms/MobileFilters/MobileFilters";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";

interface MarketplaceTemplateProps {
  products: PublicProductCard[];
  isLoadMoreButtonShown: boolean;
  isCategorySelectPopupShown: boolean;
  isFetching: boolean;
  categories: ProductCategory[];
  searchForm: UseFormReturn<MarketSearchFormData>;
  selectedCategoriesCount: number;
  onProductClick: (productId: string) => void;
  onCreateClick: () => void;
  onLoadMore: () => void;
  onCategorySelectOpen: () => void;
  onCategorySelectClose: () => void;
}

export function MarketplaceTemplate({
  products,
  isLoadMoreButtonShown,
  isCategorySelectPopupShown,
  isFetching,
  categories,
  searchForm,
  selectedCategoriesCount,
  onLoadMore,
  onProductClick,
  onCreateClick,
  onCategorySelectOpen,
  onCategorySelectClose,
}: MarketplaceTemplateProps) {
  const { t } = useTranslation();

  const setCategory = (categoryId: string) => {
    searchForm.setValue("category_l1", categoryId || "");
    setSubCategory("");
  };

  const setSubCategory = (typeId: string) => {
    searchForm.setValue("category_l2", typeId || "");
  };

  const currentCategory = searchForm.watch("category_l1");
  const currentSubCategory = searchForm.watch("category_l2");

  // --- Subcategories logic ---
  const subcategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    if (!currentCategory || currentCategory === "all") {
      // Deduplicate across all categories
      const map = new Map<string, ProductCategory["subcategories"][0]>();
      categories.flatMap((c) => c.subcategories).forEach((s) => map.set(s.code, s));
      return Array.from(map.values());
    }
    const found = categories.find((c) => c.code === currentCategory);
    return found?.subcategories ?? [];
  }, [categories, currentCategory]);

  const currentCategoryLabel = useMemo(() => {
    if (!currentCategory || currentCategory === "all") return "Все категории";
    return t(`product:category.${currentCategory}`);
  }, [currentCategory, t]);

  const currentSubCategoryLabel = useMemo(() => {
    if (!currentSubCategory) return "Все";
    return t(`product:subCategory.${currentSubCategory}`);
  }, [currentSubCategory, t]);

  // --- Scroll arrows for subcategories ---
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, subcategories]);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  const hasActiveFilters = !!currentCategory || !!currentSubCategory;

  const resetFilters = () => {
    setCategory("");
    setSubCategory("");
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* 1. Header row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1">
            <SearchBar {...searchForm.register("searchRequest")} />
          </div>
          <Button
            onClick={onCreateClick}
            className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-6 whitespace-nowrap hidden sm:inline-flex"
          >
            Создать компанию
          </Button>
        </div>

        {/* 2. Mobile filters + sort (sm:hidden) */}
        <div className="flex items-center gap-2 mb-4 sm:hidden">
          <button
            onClick={onCategorySelectOpen}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
            {selectedCategoriesCount > 0 && (
              <span className="gold-gradient text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {selectedCategoriesCount}
              </span>
            )}
          </button>
          <Select defaultValue={marketSortOptions[0].id}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {marketSortOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <MobileFilters
          isOpen={isCategorySelectPopupShown}
          categories={categories}
          currentCategory={currentCategory}
          currentSubCategory={currentSubCategory}
          onCategoryChange={setCategory}
          onSubCategoryChange={setSubCategory}
          onClose={onCategorySelectClose}
        />

        {/* 3. Desktop L1 categories */}
        {categories && categories.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.code}
                onClick={() => setCategory(category.code)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  currentCategory === category.code
                    ? "gold-gradient text-primary-foreground shadow-md shadow-primary/20 ring-2 ring-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                )}
              >
                {t(`product:category.${category.code}`)}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Сбросить
              </button>
            )}
          </div>
        )}

        {/* 4. Subcategories L2 (always visible on desktop) */}
        {subcategories.length > 0 && (
          <div className="hidden sm:block mb-5">
            {/* Breadcrumb */}
            <p className="text-xs text-muted-foreground mb-2">
              {currentCategoryLabel}
              <span className="mx-1">›</span>
              {currentSubCategoryLabel}
            </p>

            {/* Scrollable tabs */}
            <div className="relative">
              {canScrollLeft && (
                <button
                  onClick={() => scrollBy(-1)}
                  className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-start bg-gradient-to-r from-background via-background/80 to-transparent"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
              )}
              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide border-b border-border flex"
              >
                {/* "All" tab */}
                <button
                  onClick={() => setSubCategory("")}
                  className={cn(
                    "whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0",
                    !currentSubCategory
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                  )}
                >
                  Все
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub.code}
                    onClick={() => setSubCategory(sub.code)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0",
                      currentSubCategory === sub.code
                        ? "border-accent text-accent"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                    )}
                  >
                    {t(`product:subCategory.${sub.code}`)}
                  </button>
                ))}
              </div>
              {canScrollRight && (
                <button
                  onClick={() => scrollBy(1)}
                  className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-end bg-gradient-to-l from-background via-background/80 to-transparent"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 5. Desktop sort row */}
        <div className="hidden sm:flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Найденные продукты</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортировка</span>
            <Select defaultValue={marketSortOptions[0].id}>
              <SelectTrigger className="w-44 bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {marketSortOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Banner */}
        <div className="h-48 bg-[#000] rounded-md mb-6 relative">
          <Button className="absolute top-4 right-4">Нажми сюда</Button>
        </div>

        {/* 6. Product grid */}
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} onClick={() => onProductClick(product.id)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="surface-card p-12 text-center">
            <p className="text-muted-foreground">
              {isFetching ? "Загрузка..." : "Продукты не найдены"}
            </p>
          </div>
        )}

        {/* 7. Load more */}
        {isLoadMoreButtonShown && (
          <div className="text-center">
            <Button onClick={onLoadMore} disabled={isFetching}>
              {isFetching ? "Загрузка..." : "Загрузить еще"}
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
