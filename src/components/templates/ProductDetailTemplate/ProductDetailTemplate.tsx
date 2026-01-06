import { ChevronLeft, CheckCircle, Flag } from "lucide-react";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { FAQAccordion, RatingDistribution, ReviewList } from "@/components/molecules";
import { RatingStars, Loader } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import type { ProductDetails, RatingDistributionItem, Review, FAQ } from "@/types";

interface ProductDetailTemplateProps {
  product?: ProductDetails;
  reviews: Review[];
  faqs: FAQ[];
  ratingDistribution: RatingDistributionItem[];
  isLoading: boolean;
  onBackClick: () => void;
}

export function ProductDetailTemplate({
  product,
  reviews,
  faqs,
  ratingDistribution,
  isLoading,
  onBackClick,
}: ProductDetailTemplateProps) {
  if (isLoading || !product) {
    return (
      <MainLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mb-6 bg-primary/10 px-3 py-1.5 rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </button>

        <div className="max-w-5xl mx-auto">
          {/* Product Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Image */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-card">
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

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Особенности</h2>
            <div className="space-y-0">
              {product.features.map((feature, index) => {
                return (
                  <div key={feature.id}>
                    <div className="flex items-start gap-3 py-4">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-foreground flex-1">{feature.text}</p>
                    </div>
                    {index < product.features.length - 1 && <div className="h-px bg-border" />}
                  </div>
                );
              })}
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

          {/* About the creator Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">О создателе</h2>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">{product.author.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-foreground mb-1">{product.author.name}</div>
                    <div className="text-sm text-muted-foreground mb-1">
                      @shwhynot
                      <span className="mx-1">·</span>
                      Присоединился в авг. 2025
                    </div>
                    <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors mt-2">
                      <Flag className="w-4 h-4" />
                      Пожаловаться на создателя
                    </button>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-border bg-card hover:bg-muted text-foreground"
              >
                Посмотреть профиль
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Часто задаваемые вопросы:
            </h2>
            <FAQAccordion questions={faqs} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
