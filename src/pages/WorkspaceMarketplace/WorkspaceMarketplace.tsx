import { useState, useEffect } from "react";
import { WorkspaceMarketplaceTemplate } from "@/components/templates/WorkspaceMarketplaceTemplate/WorkspaceMarketplaceTemplate";
import { useGetMyProductsQuery } from "@/store/productsApi";
import { WorkspaceMarketplaceTabs } from "./types";
import { WorkspaceSortOption } from "@/types/workspace";
import { FetchMyProductsParams } from "@/services/productsService/types";

export default function WorkspaceMarketplace() {
  const [activeTab, setActiveTab] = useState<WorkspaceMarketplaceTabs>("all");
  const [sortBy, setSortBy] = useState<WorkspaceSortOption>("created_at_desc");

  const [cursor, setCursor] = useState<FetchMyProductsParams["p_cursor"]>(null);

  const PAGE_LIMIT = 8;

  const { data: products, isFetching } = useGetMyProductsQuery({
    p_status: activeTab,
    p_sort: sortBy,
    p_cursor: cursor,
    p_limit: PAGE_LIMIT,
  });

  const loadMoreButtonShown =
    products && products.length !== 0 && products.length % PAGE_LIMIT === 0;

  const handleTabChange = (tab: WorkspaceMarketplaceTabs) => {
    setCursor(null);
    setActiveTab(tab);
  };

  const handleEdit = (id: string) => {
    // TODO: Navigate to edit page when implemented
    console.log("Edit product:", id);
  };

  const handleViewStats = (id: string) => {
    // TODO: Navigate to stats page when implemented
    console.log("View stats:", id);
  };

  const handleLoadMore = () => {
    if (products && products.length > 0) {
      const lastItem = products[products.length - 1];
      setCursor(lastItem.next_cursor as FetchMyProductsParams["p_cursor"]);
    }
  };

  const handleSetSortBy = (sort: WorkspaceSortOption) => {
    setCursor(null);
    setSortBy(sort);
  };

  return (
    <WorkspaceMarketplaceTemplate
      products={products || []}
      activeTab={activeTab}
      sortBy={sortBy}
      onTabChange={handleTabChange}
      onSortChange={handleSetSortBy}
      onEdit={handleEdit}
      onViewStats={handleViewStats}
      onLoadMore={handleLoadMore}
      isFetching={isFetching}
      loadMoreButtonShown={loadMoreButtonShown}
    />
  );
}
