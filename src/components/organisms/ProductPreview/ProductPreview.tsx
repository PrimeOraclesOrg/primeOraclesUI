import { Monitor, Smartphone, Check, Image, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CATEGORY_DISPLAY_NAMES } from "@/types/createProduct";
import { CreateProductFormData } from "@/utils/validators/createProduct";

type PreviewMode = "desktop" | "mobile";

interface ProductPreviewProps {
  data: CreateProductFormData;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}

export function ProductPreview({ data, mode, onModeChange }: ProductPreviewProps) {
  const hasMedia = !!data.mediaUrl;
  const mockRating = 4.5;
  const mockReviewCount = 128;
  const mockMemberCount = 1247;

  return (
    <div className="h-full flex flex-col">
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
        <div
          className={cn("p-6 overflow-auto", mode === "mobile" ? "max-w-[375px] mx-auto" : "")}
          // style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {/* Product Header - Similar to ProductDetailTemplate */}
          <div className={cn("flex gap-8 mb-8", mode === "mobile" ? "flex-col" : "flex-row")}>
            {/* Product Image */}
            <div className={cn("flex-shrink-0", mode === "mobile" ? "w-full" : "w-72")}>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
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
            <div className="flex-1 min-w-0">
              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
                <span className="text-foreground font-medium">Автор продукта</span>
              </div>

              {/* Category */}
              <div className="text-xs text-primary uppercase tracking-wider mb-2">
                {CATEGORY_DISPLAY_NAMES[data.category]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                {data.title || "Название продукта"}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(mockRating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-primary text-sm">({mockReviewCount})</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                {data.description || "Описание продукта будет отображаться здесь..."}
              </p>

              {/* Price & CTA */}
              <div className="flex flex-col gap-3">
                <Button
                  disabled
                  className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full px-8"
                >
                  Купить за €{data.price.toFixed(2)}
                </Button>
                <span className="text-sm text-muted-foreground text-center">
                  Присоединяйтесь к {mockMemberCount} участнику
                </span>
              </div>
            </div>
          </div>

          {/* Advantages Section */}
          {data.advantages.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4">Преимущества</h4>
              <div className="grid gap-3">
                {data.advantages.map((adv) => (
                  <div
                    key={adv.position}
                    className="flex items-start gap-3 surface-card p-4 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">
                      {adv.description || "Преимущество"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section - Similar to ProductDetailTemplate */}
          {data.faq.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4 text-center">
                Часто задаваемые вопросы
              </h4>
              <Accordion type="single" collapsible className="max-w-2xl mx-auto">
                {data.faq.map((item) => (
                  <AccordionItem
                    key={item.position}
                    value={item.position.toString()}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-foreground hover:text-primary text-left">
                      {item.question || "Вопрос"}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer || "Ответ"}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
