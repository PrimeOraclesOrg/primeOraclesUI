import { Star } from "lucide-react";
import type { Review } from "@/types";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="flex-1 space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="surface-card p-4 animate-fade-in"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium">
                  {review.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">{review.author}</div>
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
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          <p className="text-muted-foreground text-sm">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
