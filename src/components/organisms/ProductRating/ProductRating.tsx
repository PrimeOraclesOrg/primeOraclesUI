import { memo } from "react";
import { RatingDistribution, ReviewList } from "@/components/molecules";
import { ProductCommentsResponse, PublicProductPage } from "@/types";

interface ProductRatingProps {
  product: PublicProductPage;
  selectedRating: number | null;
  onRatingFilterChange: (rating: number | null) => void;
  isCommentsLoading: boolean;
  isCommentsError: boolean;
  commentsData: ProductCommentsResponse;
  currentCommentsPage: number;
  onCommentsPageChange: (page: number) => void;
}

export const ProductRating = memo(
  ({
    product,
    selectedRating,
    onRatingFilterChange,
    isCommentsLoading,
    isCommentsError,
    commentsData,
    currentCommentsPage,
    onCommentsPageChange,
  }: ProductRatingProps) => {
    return (
      <div className="pb-8 sm:pb-12 sm:border-t sm:pt-10">
        <h2 className="text-xl font-bold text-foreground mb-6">Отзывы</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <RatingDistribution
            distribution={[
              { stars: 5, count: product.rating_5_count },
              { stars: 4, count: product.rating_4_count },
              { stars: 3, count: product.rating_3_count },
              { stars: 2, count: product.rating_2_count },
              { stars: 1, count: product.rating_1_count },
            ]}
            rating={product.rating}
            totalReviews={product.comments_count}
            activeRating={selectedRating}
            onRatingSelect={onRatingFilterChange}
          />
          <ReviewList
            isCommentsLoading={isCommentsLoading}
            isCommentsError={isCommentsError}
            selectedRating={selectedRating}
            onRatingFilterChange={onRatingFilterChange}
            commentsData={commentsData}
            currentCommentsPage={currentCommentsPage}
            onCommentsPageChange={onCommentsPageChange}
          />
        </div>
      </div>
    );
  }
);
