import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { ProductCard, SearchBar } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import type { PublicProductCard } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MarketplaceTemplateProps {
  products: PublicProductCard[];
  loadMoreButtonShown: boolean;
  isFetching: boolean;
  onProductClick: (productId: string) => void;
  onCreateClick: () => void;
  onLoadMore: () => void;
}

export function MarketplaceTemplate({
  products,
  loadMoreButtonShown,
  isFetching,
  onLoadMore,
  onProductClick,
  onCreateClick,
}: MarketplaceTemplateProps) {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Banner */}
        <div className="h-48 bg-[#000] rounded-md mb-6"></div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <SearchBar value={"" /* searchQuery */} onChange={/* onSearchChange */ () => {}} />
          </div>
          <Button
            onClick={onCreateClick}
            className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-4 md:px-6 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Создать компанию</span>
            <span className="sm:hidden">Создать</span>
          </Button>
        </div>

        {/* Filter and sort options */}
        <div className="mb-6 flex flex-col gap-2">
          <h3 className="mb-2 font-Roboto font-bold">Выберите категорию</h3>
          <div className="flex gap-2">
            <Button>Все</Button>
            <Button variant="outline">Трейдинг</Button>
            <Button variant="outline">Социальные сети</Button>
            <Button variant="outline">AI Продукты</Button>
            <Button variant="outline">Цифровые продукты</Button>
            <Button variant="outline">Другое</Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Button className="bg-transparent hover:bg-transparent text-accent rounded-none border-b-2 border-accent">
                Все
              </Button>
              <Button className="bg-transparent text-foreground hover:bg-transparent hover:text-accent rounded-none border-b-2 border-border hover:border-accent">
                Комьюнити
              </Button>
              <Button className="bg-transparent text-foreground hover:bg-transparent hover:text-accent rounded-none border-b-2 border-border hover:border-accent">
                Софты
              </Button>
              <Button className="bg-transparent text-foreground hover:bg-transparent hover:text-accent rounded-none border-b-2 border-border hover:border-accent">
                Обучения
              </Button>
              <Button className="bg-transparent text-foreground hover:bg-transparent hover:text-accent rounded-none border-b-2 border-border hover:border-accent">
                Другое
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Сортировка</span>
              <Select defaultValue="popularity">
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="popularity">По попоулярности</SelectItem>
                    <SelectItem value="newest">Новые сверху</SelectItem>
                    <SelectItem value="oldest">Старые сверху</SelectItem>
                    <SelectItem value="lowest_price">Дешевые сверху</SelectItem>
                    <SelectItem value="highest_price">Дорогие сверху</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
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
      </div>

      {loadMoreButtonShown && (
        <div className="text-center">
          <Button onClick={onLoadMore} disabled={isFetching}>
            {isFetching ? "Загрузка..." : "Загрузить еще"}
          </Button>
        </div>
      )}
    </MainLayout>
  );
}
