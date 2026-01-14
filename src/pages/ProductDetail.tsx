import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/store";
import { ProductDetailTemplate } from "@/components/templates";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductDetailsQuery(id || "1");

  const product = data?.product;
  const reviews = data?.reviews ?? [];
  const faqs = data?.faqs ?? [];
  const ratingDistribution = data?.ratingDistribution ?? [];

  return (
    <ProductDetailTemplate
      product={product}
      reviews={reviews}
      faqs={faqs}
      ratingDistribution={ratingDistribution}
      isLoading={isLoading}
      onBackClick={() => navigate(-1)}
    />
  );
}
