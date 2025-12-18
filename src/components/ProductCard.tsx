import { RatingStars } from "./RatingStars";

export interface Product {
  id: string;
  title: string;
  description?: string;
  image: string;
  price: number | "free";
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  reviewCount: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={onClick}
      className="surface-card overflow-hidden card-hover cursor-pointer group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-3 right-3">
          {product.price === "free" ? (
            <span className="badge-free">Бесплатно</span>
          ) : (
            <span className="badge-price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          {product.author.avatar && (
            <img 
              src={product.author.avatar} 
              alt={product.author.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate mb-2">
              {product.author.name}
            </p>
            <RatingStars 
              rating={product.rating} 
              reviewCount={product.reviewCount}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
