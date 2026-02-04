import { RatingDistributionItem } from "@/types";
import { cn } from "@/utils";

interface RatingDistribution {
  distribution: RatingDistributionItem[];
  rating: number;
  totalReviews: number;
  activeRating: number | null;
  onRatingSelect: (stars: number | null) => void;
}

export const RatingDistribution = ({
  distribution,
  rating,
  totalReviews,
  activeRating,
  onRatingSelect,
}: RatingDistribution) => {
  const getStarLabel = (stars: number) => {
    if (stars === 1) return "Звезда";
    if (stars < 5) return "Звезды";
    return "Звезд";
  };

  const getPercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={cn("text-lg", i < Math.floor(rating) ? "text-primary" : "text-muted")}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-lg font-semibold text-foreground">{rating.toFixed(2)} из 5</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{totalReviews} Всего отзывов</p>

      <div className="space-y-2">
        {distribution.map((item) => {
          const isActive = activeRating === item.stars;
          const percentage = getPercentage(item.count);

          return (
            <button
              key={item.stars}
              type="button"
              onClick={() => onRatingSelect?.(isActive ? null : item.stars)}
              aria-pressed={isActive}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 transition-colors",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/60"
              )}
            >
              <span
                className={cn(
                  "text-sm w-16 text-left",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.stars} {getStarLabel(item.stars)}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isActive ? "bg-primary" : "bg-primary/70"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span
                className={cn(
                  "text-xs min-w-[32px] text-right",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {percentage}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
