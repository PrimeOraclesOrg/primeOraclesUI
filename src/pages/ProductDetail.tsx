import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { RatingStars } from "@/components/RatingStars";
import { ReviewList } from "@/components/product/ReviewList";
import { RatingDistribution } from "@/components/product/RatingDistribution";
import { FAQSection } from "@/components/product/FAQSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useProductDetails } from "@/hooks/useProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, reviews, faqs, ratingDistribution } = useProductDetails(id || "1");

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mb-6 bg-primary/10 px-3 py-1.5 rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </button>

        {/* Product Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Product Image */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-card">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="relative -mt-20 p-4">
                <div className="text-primary font-bold italic text-lg">{product.subtitle}</div>
                <div className="text-foreground text-xs uppercase tracking-wider mt-1">
                  ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">{product.author.name.charAt(0)}</span>
                  </div>
                  <span className="text-foreground font-medium">{product.author.name}</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-primary">({product.reviewCount})</span>
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full lg:w-auto px-8">
                Купить за {product.price}$
              </Button>
              <span className="text-sm text-muted-foreground">
                Присоединяйтесь к {product.memberCount} участнику
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Отзывы</h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <RatingDistribution 
              distribution={ratingDistribution}
              rating={product.rating}
              totalReviews={product.reviewCount}
            />
            <ReviewList reviews={reviews} />
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
