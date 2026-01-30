import { WorkspaceProductCard } from "@/components/molecules/WorkspaceProductCard/WorkspaceProductCard";
import { MyProducts } from "@/types";

interface WorkspaceProductListProps {
  products: MyProducts;
  onOpenPage: (id: string) => void;
  onEdit: (id: string) => void;
  onViewStats: (id: string) => void;
}

export function WorkspaceProductList({
  products,
  onOpenPage,
  onEdit,
  onViewStats,
}: WorkspaceProductListProps) {
  if (products.length === 0) {
    return (
      <div className="surface-card p-12 text-center">
        <p className="text-muted-foreground">Продукты не найдены</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <WorkspaceProductCard
            product={product}
            onOpenPage={onOpenPage}
            onEdit={onEdit}
            onViewStats={onViewStats}
          />
        </div>
      ))}
    </div>
  );
}
