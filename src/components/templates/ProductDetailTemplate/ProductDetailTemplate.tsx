import { Check, Flag } from "lucide-react";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { FAQAccordion, UserAvatar } from "@/components/molecules";
import { RatingStars, Loader, SocialIcon, BackButton } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCommentsResponse, PublicProductPage } from "@/types";
import { ProductRating } from "@/components/organisms";

interface ProductDetailTemplateProps {
  product: PublicProductPage;
  isLoading: boolean;
  onBackClick: () => void;
  onOpenChatPopup: () => void;
  commentsData: ProductCommentsResponse;
  selectedRating: number | null;
  currentCommentsPage: number;
  onCommentsPageChange: (page: number) => void;
  onRatingFilterChange: (stars?: number) => void;
  isCommentsLoading: boolean;
  isCommentsError: boolean;
}

export function ProductDetailTemplate({
  product,
  isLoading,
  onBackClick,
  onOpenChatPopup,
  commentsData,
  selectedRating,
  currentCommentsPage,
  onCommentsPageChange,
  onRatingFilterChange,
  isCommentsLoading,
  isCommentsError,
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
      <div className="p-4 md:p-6 lg:p-8">
        {/* Back Button */}
        <BackButton onClick={onBackClick} />

        <div className="max-w-6xl mx-auto">
          {/* Product Header */}
          <div className="flex flex-col lg:flex-row gap-8 pb-8 sm:pb-12">
            {/* Product Image */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-card">
              <img
                src={product.cover_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="min-w-80 flex-1 lg:max-w-96 overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <UserAvatar avatarPath={product.creator.avatar_path} />
                  <span className="text-foreground font-medium">{product.creator.name}</span>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  {/* {product.category && (
                    <Badge
                      variant="outline"
                      className="w-fit border-gold text-gold bg-transparent font-medium"
                    >
                      {getCategoryDisplayName(product.category)}
                    </Badge>
                  )} */}
                  <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-primary">({product.comments_count})</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-auto lg:flex-shrink-0 lg:min-w-[200px]">
                <Button
                  size="sm"
                  className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full lg:w-auto px-6"
                >
                  Купить за {product.price}$
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full lg:w-auto"
                  onClick={onOpenChatPopup}
                >
                  Перейти в чат
                </Button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="pb-8 sm:pb-12 sm:border-t sm:pt-10 overflow-hidden">
            <h2 className="text-xl font-bold text-foreground mb-6">Описание</h2>
            <p className="text-foreground">{product.description}</p>
          </div>

          {/* Features Section */}
          {product?.advantages.length > 0 && (
            <div className="pb-8 sm:pb-12 sm:border-t sm:pt-10 overflow-hidden">
              <h2 className="text-xl font-bold text-foreground mb-6">Особенности</h2>
              <div className="grid grid-cols-1 gap-3">
                {product.advantages.map(({ position, description }) => {
                  return (
                    <div
                      key={position}
                      className="flex items-center gap-3 surface-card p-4 rounded-lg overflow-hidden"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground line-clamp-2">{description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {product?.faq.length > 0 && (
            <div className="pb-8 sm:pb-12 sm:border-t sm:pt-10">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                Часто задаваемые вопросы:
              </h2>
              <FAQAccordion questions={product.faq} />
            </div>
          )}

          {/* Reviews Section */}
          {product.comments_count > 0 && (
            <ProductRating
              product={product}
              selectedRating={selectedRating}
              onRatingFilterChange={onRatingFilterChange}
              isCommentsLoading={isCommentsLoading}
              isCommentsError={isCommentsError}
              commentsData={commentsData}
              currentCommentsPage={currentCommentsPage}
              onCommentsPageChange={onCommentsPageChange}
            />
          )}

          {/* About the creator Section */}
          <div className="mb-4 sm:mb-6 sm:border-t sm:pt-10 overflow-hidden">
            <h2 className="text-xl font-bold text-foreground mb-6">О создателе</h2>
            <div className="flex-1 flex-col">
              <div className="flex-1 flex flex-col justify-between sm:flex-row sm:items-center gap-4">
                <div className="flex gap-4">
                  <UserAvatar avatarPath={product.creator.avatar_path} size="16" />
                  <div className="flex-1 lg:max-w-[500px] overflow-hidden">
                    <div className="font-bold text-foreground mb-1">{product.creator.name}</div>
                    <div className="flex gap-4 items-center mb-1">
                      <div className="text-sm text-muted-foreground">
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
                    <div className="text-sm text-muted-foreground mb-1">
                      {product.creator?.bio ?? ""}
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
              <button className="flex justify-self-center sm:justify-self-start gap-1 text-sm text-foreground hover:text-primary transition-colors mt-6 sm:mt-8">
                <Flag className="w-4 h-4" />
                Пожаловаться на создателя
              </button>
            </div>
          </div>
        </div>
        {/* Product name + Buy CTA Section */}
      </div>
      <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:border-t md:rounded-lg">
        <h2 className="text-xl font-bold text-foreground">{product.title}</h2>
        <Button
          size="lg"
          className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full sm:max-w-[200px] px-8 text-base"
        >
          Купить за {product.price}$
        </Button>
      </div>
    </MainLayout>
  );
}
