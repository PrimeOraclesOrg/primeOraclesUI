import { useParams, useNavigate } from "react-router-dom";
import { ChatPopupContent } from "@/components/organisms";
import { ProductDetailTemplate } from "@/components/templates";
import { usePopup } from "@/hooks/usePopup";
import { useGetProductDetailsQuery, useGetProductCommentsQuery } from "@/store";
import { useCallback } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openPopup } = usePopup();
  const { data: product, isLoading, isError } = useGetProductDetailsQuery(id);
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetProductCommentsQuery({ productId: id! }, { skip: !id });

  if (isError) {
    navigate("/not-found", { replace: true });
  }

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onOpenChatPopup = useCallback(() => {
    openPopup(<ChatPopupContent />);
  }, [openPopup]);

  return (
    <ProductDetailTemplate
      product={product}
      isLoading={isLoading}
      onBackClick={onBackClick}
      onOpenChatPopup={onOpenChatPopup}
      comments={comments}
      isCommentsLoading={isCommentsLoading}
      isCommentsError={isCommentsError}
    />
  );
}
