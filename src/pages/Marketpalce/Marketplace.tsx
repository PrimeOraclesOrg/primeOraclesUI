import { MarketplaceTemplate } from "@/components/templates";
import { useNavigate } from "react-router-dom";
import { useMarketplace } from "./useMarketplace";

export default function Marketplace() {
  const navigate = useNavigate();
  const {
    categories,
    isCategorySelectPopupShown,
    isFetching,
    isLoadMoreButtonShown,
    marketSearchForm,
    products,
    selectedCategoriesCount,
    handleLoadMore,
    resetFilters,
    setCategory,
    setIsCategorySelectPopupShown,
    setSubCategory,
  } = useMarketplace();

  return (
    <MarketplaceTemplate
      products={products}
      categories={categories}
      onProductClick={(id) => navigate(`/products/${id}`)}
      onCreateClick={() => navigate("/create-product")}
      isLoadMoreButtonShown={isLoadMoreButtonShown}
      isCategorySelectPopupShown={isCategorySelectPopupShown}
      onCategorySelectOpen={() => setIsCategorySelectPopupShown(true)}
      onCategorySelectClose={() => setIsCategorySelectPopupShown(false)}
      onLoadMore={handleLoadMore}
      isFetching={isFetching}
      searchForm={marketSearchForm}
      selectedCategoriesCount={selectedCategoriesCount}
      setCategory={setCategory}
      setSubCategory={setSubCategory}
      resetFilters={resetFilters}
    />
  );
}
