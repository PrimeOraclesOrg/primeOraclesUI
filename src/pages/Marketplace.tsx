import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "@/store";
import { MarketplaceTemplate } from "@/components/templates";
import { SearchProductsParams } from "@/services/productsService/types";
import { useCallback, useState } from "react";

export default function Marketplace() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<SearchProductsParams["p_cursor"]>(null);
  const { data: products, isFetching } = useGetProductsQuery({
    p_cursor: cursor,
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
      onProductClick={(id) => navigate(`/products/${id}`)}
      onCreateClick={() => navigate("/create-product")}
      loadMoreButtonShown={loadMoreButtonShown}
      onLoadMore={handleLoadMore}
      isFetching={isFetching}
    />
  );
}
