import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { SearchBar } from "@/components/SearchBar";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductCard, Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import productCrypto from "@/assets/product-crypto.jpg";
import productWealth from "@/assets/product-wealth.jpg";
import productTradingBot from "@/assets/product-trading-bot.jpg";
import productSoftware from "@/assets/product-software.jpg";

const categories = ["Все", "Софты/боты", "Сообщества", "Обучения", "Цифровые материалы"];

const mockProducts: Product[] = [
  {
    id: "1",
    title: "№1 комьюнити по торговле криптовалютой",
    image: productWealth,
    price: "free",
    author: { name: "Wealth Group Credit Card Pay" },
    rating: 4.95,
    reviewCount: 421,
    category: "Сообщества",
  },
  {
    id: "2",
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%",
    image: productCrypto,
    price: 230,
    author: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    reviewCount: 145,
    category: "Обучения",
  },
  {
    id: "3",
    title: "Продажа торгового бота на форексе",
    image: productTradingBot,
    price: "free",
    author: { name: "The Haven Free" },
    rating: 4.1,
    reviewCount: 521,
    category: "Софты/боты",
  },
  {
    id: "4",
    title: "Аренда Adobe Photoshop +",
    image: productSoftware,
    price: 10,
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    category: "Цифровые материалы",
  },
  {
    id: "5",
    title: "№1 комьюнити по торговле криптовалютой",
    image: productWealth,
    price: "free",
    author: { name: "Wealth Group Credit Card Pay" },
    rating: 4.95,
    reviewCount: 421,
    category: "Сообщества",
  },
  {
    id: "6",
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%",
    image: productCrypto,
    price: 230,
    author: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    reviewCount: 145,
    category: "Обучения",
  },
  {
    id: "7",
    title: "Продажа торгового бота на форексе",
    image: productTradingBot,
    price: "free",
    author: { name: "The Haven Free" },
    rating: 4.1,
    reviewCount: 521,
    category: "Софты/боты",
  },
  {
    id: "8",
    title: "Аренда Adobe Photoshop +",
    image: productSoftware,
    price: 10,
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    category: "Цифровые материалы",
  },
];

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
        <div className="flex items-center justify-between gap-4 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Button className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-6">
            Создать компанию
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted-foreground">Найдено {filteredProducts.length}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортировать по:</span>
            <select className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
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
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-muted-foreground px-2">...</span>
          <button
            onClick={() => setCurrentPage(37)}
            className="w-10 h-10 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 transition-colors"
          >
            37
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
