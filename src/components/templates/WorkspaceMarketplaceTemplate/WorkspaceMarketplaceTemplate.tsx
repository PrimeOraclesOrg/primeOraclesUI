import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { WorkspaceStatusTabs } from "@/components/molecules/WorkspaceStatusTabs/WorkspaceStatusTabs";
import { WorkspaceSortSelect } from "@/components/molecules/WorkspaceSortSelect/WorkspaceSortSelect";
import { WorkspaceProductList } from "@/components/organisms/WorkspaceProductList/WorkspaceProductList";
import type { MyProducts } from "@/types";
import type { WorkspaceSortOption } from "@/data/workspaceProducts";
import { WorkspaceMarketplaceTabs } from "@/pages/WorkspaceMarketplace/types";

interface WorkspaceMarketplaceTemplateProps {
  products: MyProducts;
  activeTab: WorkspaceMarketplaceTabs;
  sortBy: WorkspaceSortOption;
  onTabChange: (tab: WorkspaceMarketplaceTabs) => void;
  onSortChange: (sort: WorkspaceSortOption) => void;
  onEdit: (id: string) => void;
  onViewStats: (id: string) => void;
}

export function WorkspaceMarketplaceTemplate({
  products,
  activeTab,
  sortBy,
  onTabChange,
  onSortChange,
  onEdit,
  onViewStats,
}: WorkspaceMarketplaceTemplateProps) {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Рабочее пространство "Маркетплейс"
          </h1>
          <p className="text-muted-foreground">
            Управляйте своими продуктами и просматривайте статистику
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <WorkspaceStatusTabs activeTab={activeTab} onTabChange={onTabChange} />
          <WorkspaceSortSelect value={sortBy} onChange={onSortChange} />
        </div>

        {/* Product List */}
        <div className="mb-8">
          <WorkspaceProductList products={products} onEdit={onEdit} onViewStats={onViewStats} />
        </div>

        {/* TODO: Load more btn  */}
      </div>
    </MainLayout>
  );
}
