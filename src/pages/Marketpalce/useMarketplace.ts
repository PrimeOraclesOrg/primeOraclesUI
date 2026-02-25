import { marketSortOptions } from "@/data/market";
import { SearchProductsParams } from "@/services/productsService/types";
import { useGetCategoriesForProductsQuery, useGetProductsQuery } from "@/store/productsApi";
import { MarketSortOptions } from "@/types/market";
import { MarketSearchFormData, marketSearchSchema } from "@/utils/validators/marketSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useMarketplace = () => {
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

  const setCategory = (categoryId: string) => {
    marketSearchForm.setValue("category_l1", categoryId || categories[0].code);
    setSubCategory("");
    setCursor(null);
  };

  const setSubCategory = (typeId: string) => {
    marketSearchForm.setValue("category_l2", typeId || "");
    setCursor(null);
  };

  const resetFilters = () => {
    setCategory(categories?.[0].code);
    setSubCategory("");
  };

  return {
    products,
    categories,
    isLoadMoreButtonShown,
    isCategorySelectPopupShown,
    setIsCategorySelectPopupShown,
    handleLoadMore,
    isFetching,
    marketSearchForm,
    selectedCategoriesCount,
    setCategory,
    setSubCategory,
    resetFilters,
  };
};
