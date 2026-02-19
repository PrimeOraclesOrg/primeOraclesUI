import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "@/store";
import { MarketplaceTemplate } from "@/components/templates";

export default function Marketplace() {
  const navigate = useNavigate();
  const { data: products } = useGetProductsQuery({ p_cursor: null });

  return (
    <MarketplaceTemplate
      products={products}
      onProductClick={(id) => navigate(`/products/${id}`)}
      onCreateClick={() => navigate("/create-product")}
    />
  );
}
