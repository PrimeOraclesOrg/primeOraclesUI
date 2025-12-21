import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { SearchBar } from "@/components/SearchBar";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { mockProducts, productCategories } from "@/data/products";

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Все" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <Button className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-4 md:px-6 whitespace-nowrap">
            <span className="hidden sm:inline">Создать компанию</span>
            <span className="sm:hidden">Создать</span>
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <CategoryTabs
            categories={productCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Найдено {filteredProducts.length}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Сортировать:</span>
            <select className="bg-secondary border border-border rounded-lg px-2 md:px-3 py-1.5 text-xs sm:text-sm text-foreground">
              <option>Популярности</option>
              <option>Рейтингу</option>
              <option>Цене</option>
              <option>Дате</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard
                product={product}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={37}
          onPageChange={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
}
