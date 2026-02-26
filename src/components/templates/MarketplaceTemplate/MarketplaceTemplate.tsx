import { FormEventHandler, useMemo } from "react";
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
import { Controller, UseFormReturn } from "react-hook-form";
import { MarketSearchFormData } from "@/utils/validators/marketSearch";
import { cn } from "@/utils";
import { marketSortOptions } from "@/data/market";
import { MobileFilters } from "@/components/organisms/MobileFilters/MobileFilters";
import { ScrollableRow } from "@/components/atoms";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Field } from "@/components/ui/field";

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
  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  resetFilters: () => void;
  onSearch: FormEventHandler<HTMLFormElement>;
  onSearchClear: () => void;
}

export function MarketplaceTemplate({
  products,
  isLoadMoreButtonShown,
  isCategorySelectPopupShown,
  isFetching,
  categories,
  searchForm,
  selectedCategoriesCount,
  onSearch,
  onLoadMore,
  onProductClick,
  onCreateClick,
  onCategorySelectOpen,
  onCategorySelectClose,
  setCategory,
  setSubCategory,
  resetFilters,
  onSearchClear,
}: MarketplaceTemplateProps) {
  const { t } = useTranslation();

  const currentCategoryCode = searchForm.watch("category_l1");
  const currentSubCategoryCode = searchForm.watch("category_l2");
  const sortOption = searchForm.watch("sort_by");

  // --- Subcategories logic ---
  const subcategories = useMemo(() => {
    if (categories.length === 0) return [];
    const currentCategory = categories.find((category) => category.code === currentCategoryCode);
    return currentCategory?.subcategories ?? [];
  }, [categories, currentCategoryCode]);

  const currentCategoryLabel = useMemo(() => {
    if (currentCategoryCode === "all") return "Все категории";
    return t(`product:category.${currentCategoryCode}`);
  }, [currentCategoryCode, t]);

  const currentSubCategoryLabel = useMemo(() => {
    if (!currentSubCategoryCode) return "Все";
    return t(`product:subCategory.${currentSubCategoryCode}`);
  }, [currentSubCategoryCode, t]);

  const hasActiveFilters = currentCategoryCode !== categories[0].code || !!currentSubCategoryCode;

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Banner */}
        <div className="h-48 bg-[#000] rounded-md mb-6 relative">
          <Button className="absolute top-4 right-4">Нажми сюда</Button>
        </div>
        {/* 1. Header row */}
        <div className="flex items-center gap-3 mb-5">
          <form className="flex-1 flex items-center gap-2" onSubmit={onSearch}>
            <Field orientation="horizontal">
              <SearchBar onClear={onSearchClear} {...searchForm.register("searchRequest")} />
              <Button
                variant="outline"
                className="hover:bg-foreground/5 hover:text-foreground"
                type="submit"
              >
                <span className="max-sm:hidden">Искать</span> <Search />
              </Button>
            </Field>
          </form>
          <Button
            onClick={onCreateClick}
            className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-6 whitespace-nowrap hidden min-[1200px]:inline-flex"
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
          <Controller
            name="sort_by"
            control={searchForm.control}
            render={({ field }) => (
              <Select
                value={sortOption}
                onValueChange={(value) => searchForm.setValue("sort_by", value)}
              >
                <SelectTrigger ref={field.ref} className="flex-1">
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
            )}
          />
        </div>

        <MobileFilters
          isOpen={isCategorySelectPopupShown}
          categories={categories}
          currentCategoryCode={currentCategoryCode}
          currentSubCategoryCode={currentSubCategoryCode}
          onCategoryChange={setCategory}
          onSubCategoryChange={setSubCategory}
          onClose={onCategorySelectClose}
        />

        {/* 3. Desktop L1 categories */}
        {categories.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.code}
                onClick={() => setCategory(category.code)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  currentCategoryCode === category.code
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
              <span className="text-accent">{currentSubCategoryLabel}</span>
            </p>

            {/* Scrollable tabs */}
            <ScrollableRow className="border-b border-border">
              {/* "All" tab */}
              <button
                onClick={() => setSubCategory("")}
                className={cn(
                  "whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0",
                  !currentSubCategoryCode
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                )}
              >
                Все
              </button>
              {subcategories.map((subCategory) => (
                <button
                  key={subCategory.code}
                  onClick={() => setSubCategory(subCategory.code)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0",
                    currentSubCategoryCode === subCategory.code
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                  )}
                >
                  {t(`product:subCategory.${subCategory.code}`)}
                </button>
              ))}
            </ScrollableRow>
          </div>
        )}

        {/* 5. Desktop sort row */}
        <div className="hidden sm:flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Найденные продукты</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортировка</span>
            <Controller
              name="sort_by"
              control={searchForm.control}
              render={({ field }) => (
                <Select
                  value={sortOption}
                  onValueChange={(value) => searchForm.setValue("sort_by", value)}
                >
                  <SelectTrigger ref={field.ref} className="w-44 bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {marketSortOptions.map((sortOption) => (
                        <SelectItem key={sortOption.id} value={sortOption.id}>
                          {sortOption.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* 6. Product grid */}
        {products && products.length > 0 ? (
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
            <Button
              variant="ghost"
              className="hover:bg-foreground/5 hover:text-foreground"
              onClick={onLoadMore}
              disabled={isFetching}
            >
              {isFetching ? "Загрузка..." : "Загрузить еще"}
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
