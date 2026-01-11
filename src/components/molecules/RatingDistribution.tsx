import { RatingDistributionItem } from "@/types";

interface RatingDistribution {
  distribution: RatingDistributionItem[];
  rating: number;
  totalReviews: number;
}

export const RatingDistribution = ({ distribution, rating, totalReviews }: RatingDistribution) => {
  const getStarLabel = (stars: number) => {
    if (stars === 1) return "Звезда";
    if (stars < 5) return "Звезды";
    return "Звезд";
  };

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`text-lg ${i < Math.floor(rating) ? "text-primary" : "text-muted"}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-lg font-semibold text-foreground">{rating.toFixed(2)} из 5</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{totalReviews} Всего отзывов</p>

      <div className="space-y-2">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground w-16">
              {item.stars} {getStarLabel(item.stars)}
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
