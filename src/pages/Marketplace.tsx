import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "@/store";
import { MarketplaceTemplate } from "@/components/templates";
import { SearchProductsParams } from "@/services/productsService/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetCategoriesForProductsQuery } from "@/store/productsApi";
import { useForm } from "react-hook-form";
import { MarketSearchFormData, marketSearchSchema } from "@/utils/validators/marketSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { marketSortOptions } from "@/data/market";
import { MarketSortOptions } from "@/types/market";

export default function Marketplace() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<SearchProductsParams["p_cursor"]>(null);
  const { data: categories } = useGetCategoriesForProductsQuery();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [searchRequest, setSearchRequest] = useState("");
  const [isCategorySelectPopupShown, setIsCategorySelectPopupShown] = useState(false);

  const PAGE_LIMIT = 20;

  const marketSearchForm = useForm<MarketSearchFormData>({
    resolver: zodResolver(marketSearchSchema),
    defaultValues: {
      searchRequest: "",
      sort_by: marketSortOptions[0].id,
      category_l1: "all",
      category_l2: "",
    },
    mode: "onBlur",
  });

  const formData = marketSearchForm.watch();

  const clearDebounceTimeout = () => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
  };

  useEffect(() => {
    clearDebounceTimeout();

    debounceTimeoutRef.current = setTimeout(() => {
      setSearchRequest(formData.searchRequest);
    }, 500);

    return clearDebounceTimeout;
  }, [formData.searchRequest]);

  {
    //! ПРИ СМЕНЕ КАТЕГОРИИ ОЧИЩАТЬ ПРЕДЫДУЩИЙ РЕЗУЛЬТАТ В КЭШЕ (cursor = null)
  }
  const { data: products, isFetching } = useGetProductsQuery({
    p_query: searchRequest || null,
    p_sort: formData.sort_by as MarketSortOptions,
    p_category_l1: formData.category_l1,
    p_category_l2: formData.category_l2,
    p_cursor: cursor,
    p_limit: PAGE_LIMIT,
  });

  const isLoadMoreButtonShown = products && products[products.length - 1]?.has_more;

  const handleLoadMore = useCallback(() => {
    if (products && products.length > 0) {
      const lastItem = products[products.length - 1];
      setCursor(lastItem.next_cursor as SearchProductsParams["p_cursor"]);
    }
  }, [products]);

  const selectedCategoriesCount =
    Number(formData.category_l1 !== "all") + Number(Boolean(formData.category_l2));

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
    />
  );
}
