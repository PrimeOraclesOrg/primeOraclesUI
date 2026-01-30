import { ChevronLeft, CheckCircle, Flag } from "lucide-react";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { FAQAccordion, RatingDistribution, ReviewList, UserAvatar } from "@/components/molecules";
import { RatingStars, Loader, SocialIcon } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategoryDisplayName } from "@/types/createProduct";
import type { PublicProductPage } from "@/types";

interface ProductDetailTemplateProps {
  product: PublicProductPage;
  isLoading: boolean;
  onBackClick: () => void;
}

export function ProductDetailTemplate({
  product,
  isLoading,
  onBackClick,
}: ProductDetailTemplateProps) {
  if (isLoading) {
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
                  src={product.cover_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <UserAvatar avatarPath={product.creator.avatar_path} />
                    <span className="text-foreground font-medium">{product.creator.name}</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-2">
                    {product.category && (
                      <Badge
                        variant="outline"
                        className="w-fit border-gold text-gold bg-transparent font-medium"
                      >
                        {getCategoryDisplayName(product.category)}
                      </Badge>
                    )}
                    <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <RatingStars rating={product.rating} size="md" />
                    <span className="text-primary">({product.comments_count})</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full lg:w-auto px-8">
                  Купить за {product.price}$
                </Button>
                {/* TODO: add memberCount */}
                {/* <span className="text-sm text-muted-foreground">
                  Присоединяйтесь к {product.memberCount} участнику
                </span> */}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Описание</h2>
            <p className="text-foreground">{product.description}</p>
          </div>

          {/* Features Section */}
          {product?.advantages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6">Особенности</h2>
              <div className="space-y-0">
                {product.advantages.map((advantage, index) => {
                  return (
                    <div key={advantage.position}>
                      <div className="flex items-start gap-3 py-4">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-foreground flex-1">{advantage.description}</p>
                      </div>
                      {index < product.advantages.length - 1 && <div className="h-px bg-border" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {product?.faq.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                Часто задаваемые вопросы:
              </h2>
              <FAQAccordion questions={product.faq} />
            </div>
          )}

          {/* Reviews Section */}
          {product.comments_count > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6">Отзывы</h2>
              <div className="flex flex-col lg:flex-row gap-8">
                <RatingDistribution
                  distribution={[
                    { stars: 5, count: product.rating_5_count },
                    { stars: 4, count: product.rating_4_count },
                    { stars: 3, count: product.rating_3_count },
                    { stars: 2, count: product.rating_2_count },
                    { stars: 1, count: product.rating_1_count },
                  ]}
                  rating={product.rating}
                  totalReviews={product.comments_count}
                />
                {/* TODO: add product.comments */}
                {/* <ReviewList reviews={product.comments} /> */}
              </div>
            </div>
          )}

          {/* About the creator Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">О создателе</h2>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <UserAvatar avatarPath={product.creator.avatar_path} size="16" />
                  <div className="flex-1">
                    <div className="font-bold text-foreground mb-1">{product.creator.name}</div>
                    <div className="flex gap-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        @{product.creator.username}
                      </div>
                      {product.creator.social_medias.length > 0 && (
                        <div className="flex items-center gap-4">
                          {product.creator.social_medias.map((sm) => (
                            <a
                              key={`${sm.type}-${sm.link}`}
                              href={sm.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors inline-flex"
                              aria-label={sm.type}
                            >
                              <SocialIcon network={sm.type} />
                            </a>
                          ))}
                        </div>
                      )}
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
        </div>
      </div>
    </MainLayout>
  );
}
