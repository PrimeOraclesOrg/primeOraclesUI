import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { WorkspaceStatusTabs } from "@/components/molecules/WorkspaceStatusTabs/WorkspaceStatusTabs";
import { WorkspaceSortSelect } from "@/components/molecules/WorkspaceSortSelect/WorkspaceSortSelect";
import { WorkspaceProductList } from "@/components/organisms/WorkspaceProductList/WorkspaceProductList";
import type { MyProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { WorkspaceMarketplaceTabs, WorkspaceSortOption } from "@/types/workspace";

interface WorkspaceMarketplaceTemplateProps {
  products: Array<MyProduct>;
  activeTab: WorkspaceMarketplaceTabs;
  sortBy: WorkspaceSortOption;
  isFetching: boolean;
  loadMoreButtonShown: boolean;
  onTabChange: (tab: WorkspaceMarketplaceTabs) => void;
  onSortChange: (sort: WorkspaceSortOption) => void;
  onOpenPage: (id: string) => void;
  onEdit: (id: string) => void;
  onViewStats: (id: string) => void;
  onLoadMore: () => void;
}

export function WorkspaceMarketplaceTemplate({
  products,
  activeTab,
  sortBy,
  isFetching,
  loadMoreButtonShown,
  onTabChange,
  onSortChange,
  onOpenPage,
  onEdit,
  onViewStats,
  onLoadMore,
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
          <WorkspaceProductList
            products={products}
            isFetching={isFetching}
            onOpenPage={onOpenPage}
            onEdit={onEdit}
            onViewStats={onViewStats}
          />
        </div>

        {loadMoreButtonShown && (
          <div className="text-center">
            <Button onClick={onLoadMore} disabled={isFetching}>
              {isFetching ? "Загрузка..." : "Загрузить еще"}
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
