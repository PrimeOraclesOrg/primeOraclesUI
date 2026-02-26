import { RatingStars } from "@/components/atoms";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { HomeProduct } from "@/types";
import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product | HomeProduct;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div onClick={onClick} className="overflow-hidden cursor-pointer group h-full">
      <div className="relative aspect-video overflow-hidden rounded-sm">
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

      <div className="py-2">
        <div className="flex items-start gap-3">
          {"avatar_path" in product.creator && (
            <UserAvatar size="8" avatarPath={product.creator.avatar_path} />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium font-Roboto text-balance text-foreground line-clamp-3 leading-tight mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{product.creator.name}</p>
            <RatingStars rating={product.rating} reviewCount={product.comments_count} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
