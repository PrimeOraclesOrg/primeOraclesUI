import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  showNumber = true, 
  reviewCount,
  size = "sm" 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < Math.floor(rating) 
                ? "fill-primary text-primary" 
                : i < rating 
                  ? "fill-primary/50 text-primary" 
                  : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-foreground ml-1`}>
          {rating % 1 === 0 ? rating.toFixed(1) : rating.toFixed(2)}
          {reviewCount !== undefined && (
            <span className="text-muted-foreground"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
