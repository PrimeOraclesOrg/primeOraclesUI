import { ExternalLink, Pencil, BarChart3 } from "lucide-react";
import { RatingStars } from "@/components/atoms";
import { WorkspaceStatusBadge } from "@/components/atoms/WorkspaceStatusBadge/WorkspaceStatusBadge";
import { CategoryBadge } from "@/components/atoms/CategoryBadge/CategoryBadge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { WorkspaceProduct } from "@/types";

interface WorkspaceProductCardProps {
  product: WorkspaceProduct;
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
    <div className="surface-card p-4 flex flex-col lg:flex-row lg:items-center gap-4">
      {/* Product Image */}
      <div className="relative w-full lg:w-40 h-32 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <span className="badge-price px-2 py-0.5 rounded-full text-xs font-medium">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground truncate">
            {product.title}
          </h3>
          <WorkspaceStatusBadge status={product.status} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">
            {product.author.name}
          </span>
          <CategoryBadge category={product.category} />
        </div>

        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />
      </div>

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
  );
}
