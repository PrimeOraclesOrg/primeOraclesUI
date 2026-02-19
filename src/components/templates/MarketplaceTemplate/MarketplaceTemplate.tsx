import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { SearchBar, CategoryTabs, ProductCard, Pagination } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import type { PublicProductCard } from "@/types";

interface MarketplaceTemplateProps {
  products: PublicProductCard[];
  onProductClick: (productId: string) => void;
  onCreateClick: () => void;
}

export function MarketplaceTemplate({
  products,
  onProductClick,
  onCreateClick,
}: MarketplaceTemplateProps) {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            {/* <SearchBar value={searchQuery} onChange={onSearchChange} /> */}
          </div>
          <Button
            onClick={onCreateClick}
            className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-4 md:px-6 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Создать компанию</span>
            <span className="sm:hidden">Создать</span>
          </Button>
        </div>

        {/* Product Grid */}
        {products ? (
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
          "Загрузка..."
        )}
      </div>
    </MainLayout>
  );
}
