import { memo } from "react";
import { Star } from "lucide-react";
import { ProductCommentsResponse } from "@/types";
import { UserAvatar } from "@/components/molecules/UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/atoms";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ReviewListProps {
  isCommentsLoading: boolean;
  isCommentsError: boolean;
  selectedRating: number | null;
  onRatingFilterChange: (rating: number | null) => void;
  commentsData: ProductCommentsResponse;
  currentCommentsPage: number;
  onCommentsPageChange: (page: number) => void;
}

export const ReviewList = memo(
  ({
    isCommentsLoading,
    isCommentsError,
    selectedRating,
    onRatingFilterChange,
    commentsData,
    currentCommentsPage,
    onCommentsPageChange,
  }: ReviewListProps) => {
    return (
      <>
        {isCommentsLoading ? (
          <div className="flex-1 flex items-center justify-center min-h-[120px]">
            <Loader size="md" />
          </div>
        ) : isCommentsError ? (
          <div className="flex-1 flex items-center justify-center min-h-[120px]">
            <p className="text-foreground">Ошибка при загрузке отзывов</p>
          </div>
        ) : (
          <div className={"flex-1 flex flex-col gap-4 sm:min-h-[350px]"}>
            {selectedRating && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                <span>
                  Показаны отзывы с {selectedRating} {selectedRating === 1 ? "звездой" : "звездами"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 text-primary"
                  onClick={() => onRatingFilterChange(null)}
                >
                  Сбросить
                </Button>
              </div>
            )}
            {commentsData.comments.length === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-lg bg-muted/30 min-h-12">
                <p className="text-sm text-muted-foreground text-center px-4">
                  Нет отзывов для выбранного рейтинга
                </p>
              </div>
            ) : (
              <div className="flex-1 space-y-4">
                {commentsData.comments.map((review) => (
                  <div key={review.author_id} className="surface-card p-4 animate-fade-in">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <UserAvatar avatarPath={review.author_avatar} />
                        <div>
                          <div className="font-medium text-foreground">{review.author_name}</div>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.created_at}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            {commentsData.totalPages > 1 && (
              <Pagination>
                <PaginationContent className="flex-wrap justify-center">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentCommentsPage > 1) onCommentsPageChange(currentCommentsPage - 1);
                      }}
                      aria-disabled={currentCommentsPage <= 1}
                      className={
                        currentCommentsPage <= 1 ? "pointer-events-none opacity-50" : undefined
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="flex-1 px-4 py-2 text-sm text-muted-foreground">
                      {currentCommentsPage} / {commentsData.totalPages}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentCommentsPage < commentsData.totalPages)
                          onCommentsPageChange(currentCommentsPage + 1);
                      }}
                      aria-disabled={currentCommentsPage >= commentsData.totalPages}
                      className={
                        currentCommentsPage >= commentsData.totalPages
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </>
    );
  }
);
