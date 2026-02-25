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

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Banner */}
        <div className="h-48 bg-[#000] rounded-md mb-6 relative">
          <Button className="absolute top-4 right-4">Нажми сюда</Button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <SearchBar {...searchForm.register("searchRequest")} />
          </div>
          <Button
            onClick={onCreateClick}
            className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-4 md:px-6 whitespace-nowrap hidden sm:inline"
          >
            <span>Создать компанию</span>
          </Button>
        </div>

        {/* Filter and sort options */}
        <div
          className={cn(
            "top-0 left-0 w-full h-full max-sm:pt-24 pb-8 px-4 bg-background sm:bg-transparent z-10 sm:relative max-sm:overflow-auto",
            isCategorySelectPopupShown
              ? "max-sm:[html:has(&)_body]:overflow-hidden max-sm:fixed"
              : "max-sm:hidden"
          )}
        >
          <Button onClick={onCategorySelectClose} className="sm:hidden mb-4">
            Назад
          </Button>
          <div className="flex flex-col sm:block">
            <div className="max-sm:mb-8">
              <h3 className="mb-2 font-Roboto font-bold max-sm:text-center max-sm:text-lg max-sm:mb-4">
                Выберите категорию
              </h3>
              {categories && (
                <div className="grid min-[460px]:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fit,150px)] gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.code}
                      variant={currentCategory === category.code ? "default" : "outline"}
                      onClick={() => setCategory(category.code)}
                    >
                      {t(`product:category.${category.code}`)}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col mb-4 max-sm:mb-8">
              <div className="w-full">
                {currentCategory && (
                  <>
                    <h4 className="my-2 font-Roboto font-bold text-sm max-sm:text-center max-sm:text-lg max-sm:mb-4">
                      Выберите тип
                    </h4>
                    <div className="grid min-[460px]:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:grid-cols-[repeat(auto-fit,120px)]">
                      <Button
                        className={cn(
                          "bg-transparent hover:bg-transparent rounded-none border-b-2",
                          currentSubCategory
                            ? "text-foreground hover:text-accent border-border hover:border-accent"
                            : "border-accent text-accent"
                        )}
                        onClick={() => setSubCategory("")}
                      >
                        Все
                      </Button>
                      {categories
                        ?.find((category) => category.code === currentCategory)
                        .subcategories.map((subCategory) => (
                          <Button
                            key={subCategory.code}
                            className={cn(
                              "bg-transparent hover:bg-transparent rounded-none border-b-2 flex-1",
                              currentSubCategory === subCategory.code
                                ? "border-accent text-accent"
                                : "text-foreground hover:text-accent border-border hover:border-accent"
                            )}
                            onClick={() => setSubCategory(subCategory.code)}
                          >
                            {t(`product:subCategory.${subCategory.code}`)}
                          </Button>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <Button onClick={onCategorySelectClose} className="sm:hidden">
              Применить
            </Button>
          </div>
        </div>

        <Button onClick={onCategorySelectOpen} className="mb-2 sm:hidden">
          Выбор категории ({selectedCategoriesCount})
        </Button>

        <div className="flex justify-between mb-4">
          <h3 className="hidden sm:block">Доступные продукты</h3>
          <div className="flex items-center gap-2 self-end">
            <span className="text-sm text-muted-foreground">Сортировка</span>
            <Select defaultValue={marketSortOptions[0].id}>
              <SelectTrigger className="w-full max-w-48">
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
          </div>
        </div>

        {/* Product Grid */}
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 items-stretch">
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
      </div>

      {isLoadMoreButtonShown && (
        <div className="text-center">
          <Button onClick={onLoadMore} disabled={isFetching}>
            {isFetching ? "Загрузка..." : "Загрузить еще"}
          </Button>
        </div>
      )}
    </MainLayout>
  );
}
