import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "@/store";
import { MarketplaceTemplate } from "@/components/templates";

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetProductsQuery({ category: activeCategory, searchQuery });
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];

  return (
    <MarketplaceTemplate
      products={products}
      categories={categories}
      searchQuery={searchQuery}
      activeCategory={activeCategory}
      currentPage={currentPage}
      totalPages={37}
      onSearchChange={setSearchQuery}
      onCategoryChange={setActiveCategory}
      onPageChange={setCurrentPage}
      onProductClick={(id) => navigate(`/product/${id}`)}
      onCreateClick={() => {}}
    />
  );
}
