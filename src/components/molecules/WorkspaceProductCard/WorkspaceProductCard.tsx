import { ExternalLink, Pencil, BarChart3 } from "lucide-react";
import { RatingStars } from "@/components/atoms";
import { WorkspaceStatusBadge } from "@/components/atoms/WorkspaceStatusBadge/WorkspaceStatusBadge";
import { CategoryBadge } from "@/components/atoms/CategoryBadge/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MyProducts } from "@/types";
import { storageUrlBase } from "@/data";
import { formatDateTime } from "@/utils";

interface WorkspaceProductCardProps {
  product: MyProducts[0];
  onOpenPage: (id: string) => void;
  onEdit: (id: string) => void;
  onViewStats: (id: string) => void;
}

export function WorkspaceProductCard({
  product,
  onOpenPage,
  onEdit,
  onViewStats,
}: WorkspaceProductCardProps) {
  return (
    <div className="surface-card p-4 flex flex-col md:flex-row gap-4">
      {/* Product Image */}
      <div className="relative w-full md:w-60 h-32 md:h-36 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={`${storageUrlBase}/${product.cover_url}`}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <span className="badge-price px-2 py-0.5 rounded-full text-xs font-medium">
            ${Number(product.price)?.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start gap-2 mb-1 justify-between">
            <h3 className="font-semibold text-foreground line-clamp-3">{product.title}</h3>
            <WorkspaceStatusBadge is_active={product.is_active} />
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <CategoryBadge category={product.category} />
          </div>
          <div className="text-xs mb-2">
            <p>
              <span className="text-sm text-muted-foreground">Создано:</span>{" "}
              {formatDateTime(product.created_at)}
            </p>
            <p>
              <span className="text-sm text-muted-foreground">Изменено:</span>{" "}
              {formatDateTime(product.updated_at)}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <RatingStars rating={product.rating} reviewCount={product.comments_count} size="sm" />
          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    onClick={() => onOpenPage(product.id)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-popover text-popover-foreground border-border"
                >
                  <p>Открыть страницу</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => onEdit(product.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-popover text-popover-foreground border-border"
                >
                  <p>Редактировать</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="default"
              size="sm"
              className="gold-gradient text-primary-foreground hover:opacity-90 gap-2"
              onClick={() => onViewStats(product.id)}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Статистика</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
