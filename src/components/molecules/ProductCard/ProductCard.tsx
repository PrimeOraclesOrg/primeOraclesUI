import { RatingStars } from "@/components/atoms";
import type { HomeProductCard, PublicProductCard } from "@/types";
import { UserAvatar } from "../UserAvatar/UserAvatar";

interface ProductCardProps {
  product: PublicProductCard | HomeProductCard;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div onClick={onClick} className="surface-card overflow-hidden card-hover cursor-pointer group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.cover_url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-3 right-3">
          {product.price === 0 ? (
            <span className="badge-free">Бесплатно</span>
          ) : (
            <span className="badge-price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {"avatar_path" in product.creator && (
            <UserAvatar avatarPath={product.creator.avatar_path} />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate mb-2">{product.creator.name}</p>
            <RatingStars rating={product.rating} reviewCount={product.comments_count} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
