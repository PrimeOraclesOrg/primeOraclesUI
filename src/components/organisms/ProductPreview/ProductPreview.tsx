import { Monitor, Smartphone, Check, Image, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCategoryDisplayName } from "@/types/createProduct";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import { RatingStars, SocialIcon } from "@/components/atoms";
import { FAQAccordion, UserAvatar } from "@/components/molecules";
import { Badge } from "@/components/ui/badge";
import { FAQ, FullProfile } from "@/types";
import { useMemo } from "react";

type PreviewMode = "desktop" | "mobile";

interface ProductPreviewProps {
  author?: FullProfile;
  data: CreateProductFormData;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}

export function ProductPreview({ data, mode, author, onModeChange }: ProductPreviewProps) {
  const hasMedia = !!data.mediaUrl;
  const mockRating = 0;
  const mockReviewCount = 0;

  const faqQuestions: FAQ[] = useMemo(() => {
    if (!data?.faq) return [];
    return data.faq.map((question, index) => ({
      question: question?.question || `Вопрос ${index + 1}`,
      answer: question?.answer || `Ответ ${index + 1}`,
      position: question?.position || 0,
    }));
  }, [data]);

  const advantages = useMemo(() => {
    if (!data?.advantages) return [];
    return data.advantages.map((advantage, index) => ({
      position: advantage.position || 0,
      description: advantage.description || `Преимущество ${index + 1}`,
    }));
  }, [data]);

  return (
    <div className="flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Предпросмотр продукта</h2>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8 p-0", mode === "desktop" && "bg-card text-foreground")}
            onClick={() => onModeChange("desktop")}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8 p-0", mode === "mobile" && "bg-card text-foreground")}
            onClick={() => onModeChange("mobile")}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div
        className={cn(
          "flex-1 bg-card rounded-xl border border-border overflow-hidden",
          mode === "mobile" ? "max-w-[375px] mx-auto" : ""
        )}
      >
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          {mode === "desktop" ? (
            <div className="absolute">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
            </div>
          ) : null}
          <div className="flex-1 flex justify-center">
            <div className="bg-background/50 rounded-full px-4 py-1">primeoracles.com/product</div>
          </div>
        </div>

        {/* Preview Content */}
        <div className={cn("p-6 overflow-auto", mode === "mobile" ? "max-w-[375px] mx-auto" : "")}>
          {/* Product Header - Similar to ProductDetailTemplate */}
          <div className={cn("flex gap-8 mb-8", mode === "mobile" ? "flex-col" : "flex-row")}>
            {/* Product Image */}
            <div className={cn("flex-shrink-0", mode === "mobile" ? "w-full" : "w-72")}>
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                {hasMedia ? (
                  <img src={data.mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <span className="text-sm">Изображение продукта</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <UserAvatar avatarPath={author?.avatar_path} />
                  <span className="text-foreground font-medium">
                    {author?.name || "Автор продукта"}
                  </span>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  {data.category && (
                    <Badge
                      variant="outline"
                      className="w-fit border-gold text-gold bg-transparent font-medium"
                    >
                      {getCategoryDisplayName(data.category)}
                    </Badge>
                  )}
                  <h1 className="text-2xl font-bold text-foreground line-clamp-2 break-words">
                    {data.title || "Название продукта"}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <RatingStars rating={mockRating} size="md" />
                  <span className="text-primary">({mockReviewCount})</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col gap-2 w-full">
                <Button
                  size="sm"
                  className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full px-6"
                  disabled
                >
                  Купить за {data.price.toFixed(2)}$
                </Button>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Перейти в чат
                </Button>
              </div>
            </div>
          </div>

          <div className="pb-8 overflow-hidden">
            <h2 className="text-xl font-bold text-foreground mb-6">Описание</h2>
            <p className="text-foreground break-words">
              {data.description || "Описание продукта будет отображаться здесь..."}
            </p>
          </div>

          {/* Features Section */}
          {advantages.length > 0 && (
            <div className="pb-8 overflow-hidden">
              <h2 className="text-xl font-bold text-foreground mb-6">Особенности</h2>
              <div className="grid grid-cols-1 gap-3">
                {advantages.map(({ position, description }) => {
                  return (
                    <div
                      key={position}
                      className="flex items-center gap-3 surface-card p-4 rounded-lg overflow-hidden"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground line-clamp-2 break-words">
                        {description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {faqQuestions.length > 0 && (
            <div className="pb-8">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                Часто задаваемые вопросы:
              </h2>
              <FAQAccordion questions={faqQuestions} />
            </div>
          )}

          {/* About the creator Section */}
          <div className="mb-4 overflow-hidden">
            <h2 className="text-xl font-bold text-foreground mb-6">О создателе</h2>
            <div className="flex-1 flex-col">
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex gap-4">
                  <UserAvatar avatarPath={author?.avatar_path} size="16" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold text-foreground mb-1">
                      {author?.name || "Автор продукта"}
                    </div>
                    <div className="flex gap-4 items-center mb-1">
                      <div className="text-sm text-muted-foreground">
                        @{author?.username || "author"}
                      </div>
                      {author?.social_medias.length > 0 && (
                        <div className="flex items-center gap-4">
                          {author.social_medias.map((sm) => (
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
                    <div className="text-sm text-muted-foreground mb-1">{author?.bio ?? ""}</div>
                  </div>
                </div>
                <Button
                  disabled
                  variant="outline"
                  className="border-border bg-card text-foreground"
                >
                  Посмотреть профиль
                </Button>
              </div>
              <button
                disabled
                className="flex justify-self-center gap-1 text-sm text-muted-foreground transition-colors mt-6"
              >
                <Flag className="w-4 h-4" />
                Пожаловаться на создателя
              </button>
            </div>
          </div>
          <div className="py-8 flex flex-col items-center justify-between gap-4 px-6">
            <h2 className="text-xl font-bold text-foreground line-clamp-2 break-words max-w-full">
              {data.title || "Название продукта"}
            </h2>
            <Button
              disabled
              size="lg"
              className="gold-gradient text-primary-foreground transition-opacity w-full px-8 text-base"
            >
              Купить за {data.price}$
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
