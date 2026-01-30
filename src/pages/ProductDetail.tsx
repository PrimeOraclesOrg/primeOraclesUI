import { useParams, useNavigate } from "react-router-dom";
import { ProductDetailTemplate } from "@/components/templates";
import { useGetProductDetailsQuery } from "@/store";
import { useCallback } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetProductDetailsQuery(id);

  if (isError) {
    navigate("/not-found", { replace: true });
  }

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ProductDetailTemplate product={product} isLoading={isLoading} onBackClick={onBackClick} />
  );
}
