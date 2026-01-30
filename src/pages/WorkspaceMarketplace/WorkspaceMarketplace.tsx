import { useState, useEffect } from "react";
import { WorkspaceMarketplaceTemplate } from "@/components/templates/WorkspaceMarketplaceTemplate/WorkspaceMarketplaceTemplate";
import { type WorkspaceSortOption } from "@/data/workspaceProducts";
import { useGetMyProductsQuery } from "@/store/productsApi";
import { WorkspaceMarketplaceTabs } from "./types";

export default function WorkspaceMarketplace() {
  const [activeTab, setActiveTab] = useState<WorkspaceMarketplaceTabs>("all");
  const [sortBy, setSortBy] = useState<WorkspaceSortOption>("date");
  const { data: products } = useGetMyProductsQuery();

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleTabChange = (tab: WorkspaceMarketplaceTabs) => {
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

  return (
    <WorkspaceMarketplaceTemplate
      products={products || []}
      activeTab={activeTab}
      sortBy={sortBy}
      onTabChange={handleTabChange}
      onSortChange={setSortBy}
      onEdit={handleEdit}
      onViewStats={handleViewStats}
    />
  );
}
