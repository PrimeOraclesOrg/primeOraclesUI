import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "@/store";
import { MarketplaceTemplate } from "@/components/templates";
import { SearchProductsParams } from "@/services/productsService/types";
import { useCallback, useState } from "react";
import { useGetCategoriesForProductsQuery } from "@/store/productsApi";
import { useForm } from "react-hook-form";
import { MarketSearchFormData, marketSearchSchema } from "@/utils/validators/marketSearch";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Marketplace() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<SearchProductsParams["p_cursor"]>(null);
  const { data: categories } = useGetCategoriesForProductsQuery();

  const PAGE_LIMIT = 20;

  const marketSearchForm = useForm<MarketSearchFormData>({
    resolver: zodResolver(marketSearchSchema),
    defaultValues: {
      searchRequest: "",
      sort_by: "",
      category_l1: "all",
      category_l2: "",
    },
    mode: "onBlur",
  });

  const formData = marketSearchForm.watch();

  const { data: products, isFetching } = useGetProductsQuery({
    p_category_l1: formData.category_l1,
    p_category_l2: formData.category_l2,
    p_cursor: cursor,
    p_limit: PAGE_LIMIT,
  });

  const loadMoreButtonShown = products && products[products.length - 1]?.has_more;
  const handleLoadMore = useCallback(() => {
    if (products && products.length > 0) {
      const lastItem = products[products.length - 1];
      setCursor(lastItem.next_cursor as SearchProductsParams["p_cursor"]);
    }
  }, [products]);

  return (
    <MarketplaceTemplate
      products={products}
      categories={categories}
      onProductClick={(id) => navigate(`/products/${id}`)}
      onCreateClick={() => navigate("/create-product")}
      loadMoreButtonShown={loadMoreButtonShown}
      onLoadMore={handleLoadMore}
      isFetching={isFetching}
      searchForm={marketSearchForm}
    />
  );
}
