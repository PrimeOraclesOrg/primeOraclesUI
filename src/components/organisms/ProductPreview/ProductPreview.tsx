import { Monitor, Smartphone, Check, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CreateProductFormData } from "@/types/createProduct";

type PreviewMode = "desktop" | "mobile";

interface ProductPreviewProps {
  data: CreateProductFormData;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}

export function ProductPreview({ data, mode, onModeChange }: ProductPreviewProps) {
  const hasMedia = !!data.mediaUrl;
  
  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Предпросмотр продукта</h2>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              mode === "desktop" && "bg-card text-foreground"
            )}
            onClick={() => onModeChange("desktop")}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              mode === "mobile" && "bg-card text-foreground"
            )}
            onClick={() => onModeChange("mobile")}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-background/50 rounded-full px-4 py-1 text-xs text-muted-foreground">
              primeoracles.com/product
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div 
          className={cn(
            "p-4 overflow-auto",
            mode === "mobile" ? "max-w-[375px] mx-auto" : ""
          )}
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          <div className={cn(
            "flex gap-6",
            mode === "mobile" ? "flex-col" : "flex-row"
          )}>
            {/* Product Image */}
            <div className={cn(
              "flex-shrink-0",
              mode === "mobile" ? "w-full" : "w-48"
            )}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                {hasMedia ? (
                  <img
                    src={data.mediaUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <span className="text-xs">Изображение</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-primary mb-1">{data.category}</div>
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                {data.name || "Название продукта"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {data.description || "Описание продукта будет отображаться здесь..."}
              </p>
              
              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary">
                  €{data.price.toFixed(2)}
                </span>
                <Button size="sm" className="gold-gradient text-primary-foreground">
                  Купить
                </Button>
              </div>
            </div>
          </div>

          {/* Advantages */}
          {data.advantages.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Преимущества</h4>
              <div className="space-y-2">
                {data.advantages.map((adv) => (
                  <div key={adv.id} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{adv.text || "Преимущество"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {data.faq.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Часто задаваемые вопросы</h4>
              <div className="space-y-3">
                {data.faq.map((item) => (
                  <div key={item.id} className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-foreground mb-1">
                      {item.question || "Вопрос"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.answer || "Ответ"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
