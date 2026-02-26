import { marketSortOptions } from "@/data/market";
import { SearchProductsParams } from "@/services/productsService/types";
import { useGetCategoriesForProductsQuery, useGetProductsQuery } from "@/store/productsApi";
import { MarketSortOptions } from "@/types/market";
import { MarketSearchFormData, marketSearchSchema } from "@/utils/validators/marketSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEventHandler, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export const useMarketplace = () => {
  const [cursor, setCursor] = useState<SearchProductsParams["p_cursor"]>(null);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesForProductsQuery();
  const [searchRequest, setSearchRequest] = useState("");
  const [isCategorySelectPopupShown, setIsCategorySelectPopupShown] = useState(false);

  const PAGE_LIMIT = 2;

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

  const { data: products, isFetching } = useGetProductsQuery({
    p_query: searchRequest || null,
    p_sort: formData.sort_by as MarketSortOptions,
    p_category_l1: formData.category_l1 || "all",
    p_category_l2: formData.category_l2 || "all",
    p_cursor: cursor,
    p_limit: PAGE_LIMIT,
  });

  const showLoadMoreButton = products && products[products.length - 1]?.has_more;

  const handleLoadMore = useCallback(() => {
    if (products && products.length > 0) {
      const lastItem = products[products.length - 1];
      setCursor(lastItem.next_cursor as SearchProductsParams["p_cursor"]);
    }
  }, [products]);

  const selectedCategoriesCount =
    Number(formData.category_l1 !== "all") + Number(Boolean(formData.category_l2));

  const setCategory = (categoryId: string) => {
    if (!categories) return;
    marketSearchForm.setValue("category_l1", categoryId || categories[0].code);
    setSubCategory("");
    setCursor(null);
  };

  const setSubCategory = (typeId: string) => {
    marketSearchForm.setValue("category_l2", typeId || "");
    setCursor(null);
  };

  const resetFilters = () => {
    if (!categories) return;
    setCategory(categories[0].code);
    setSubCategory("");
  };

  const onSearch: FormEventHandler = (event) => {
    event.preventDefault();
    setSearchRequest(formData.searchRequest);
    setCursor(null);
  };

  const onSearchClear = () => {
    marketSearchForm.setValue("searchRequest", "");
    setSearchRequest("");
    setCursor(null);
  };

  return {
    products,
    categories,
    isCategoriesLoading,
    isCategoriesError,
    showLoadMoreButton,
    isCategorySelectPopupShown,
    isFetching,
    marketSearchForm,
    selectedCategoriesCount,
    onSearchClear,
    refetchCategories,
    setIsCategorySelectPopupShown,
    handleLoadMore,
    onSearch,
    setCategory,
    setSubCategory,
    resetFilters,
  };
};
