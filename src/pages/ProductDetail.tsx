import { useParams, useNavigate } from "react-router-dom";
import { ChatPopupContent } from "@/components/organisms";
import { ProductDetailTemplate } from "@/components/templates";
import { usePopup } from "@/hooks/usePopup";
import { useGetProductDetailsQuery, useGetProductCommentsQuery } from "@/store";
import { useCallback, useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openPopup } = usePopup();
  const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(id);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetProductCommentsQuery(
    { productId: id, page: currentCommentsPage, rating: ratingFilter },
    { skip: !id }
  );

  if (isError) {
    navigate("/not-found", { replace: true });
  }

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onOpenChatPopup = useCallback(() => {
    openPopup(<ChatPopupContent />);
  }, [openPopup]);

  const onRatingFilterChange = useCallback(
    (stars: number | null) => {
      setCurrentCommentsPage(1);
      setRatingFilter(stars);
    },
    [setCurrentCommentsPage, setRatingFilter]
  );

  useEffect(() => {
    setCurrentCommentsPage(1);
    setRatingFilter(null);
  }, []);

  return (
    <ProductDetailTemplate
      product={product}
      isLoading={isLoading}
      onBackClick={onBackClick}
      onOpenChatPopup={onOpenChatPopup}
      commentsData={commentsData}
      currentCommentsPage={currentCommentsPage}
      onCommentsPageChange={setCurrentCommentsPage}
      selectedRating={ratingFilter}
      onRatingFilterChange={onRatingFilterChange}
      isCommentsLoading={isCommentsLoading}
      isCommentsError={isCommentsError}
    />
  );
}
