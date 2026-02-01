import { Star } from "lucide-react";
import { Review } from "@/types";
import { UserAvatar } from "./UserAvatar/UserAvatar";

interface ReviewList {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewList) => {
  return (
    <div className="flex-1 space-y-4">
      {reviews.map((review) => (
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
                        i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
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
  );
};
