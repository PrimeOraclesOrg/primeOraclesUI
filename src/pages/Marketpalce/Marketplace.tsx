import { MarketplaceTemplate } from "@/components/templates";
import { LoadingScreen } from "@/components/atoms";
import { ErrorState } from "@/components/atoms";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useMarketplace } from "./useMarketplace";

export default function Marketplace() {
  const navigate = useNavigate();
  const {
    categories,
    isCategoriesLoading,
    isCategoriesError,
    isCategorySelectPopupShown,
    isFetching,
    showLoadMoreButton,
    marketSearchForm,
    products,
    selectedCategoriesCount,
    refetchCategories,
    onSearch,
    handleLoadMore,
    resetFilters,
    setCategory,
    setIsCategorySelectPopupShown,
    setSubCategory,
    onSearchClear,
  } = useMarketplace();

  if (isCategoriesLoading) {
    return <LoadingScreen />;
  }

  if (isCategoriesError || !categories) {
    return (
      <MainLayout>
        <ErrorState
          title="Не удалось загрузить категории"
          message="Произошла ошибка при загрузке данных. Попробуйте ещё раз."
          onRetry={refetchCategories}
        />
      </MainLayout>
    );
  }

  return (
    <MarketplaceTemplate
      onSearch={onSearch}
      products={products}
      categories={categories}
      onProductClick={(id) => navigate(`/products/${id}`)}
      onCreateClick={() => navigate("/create-product")}
      showLoadMoreButton={showLoadMoreButton}
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
      onSearchClear={onSearchClear}
    />
  );
}
