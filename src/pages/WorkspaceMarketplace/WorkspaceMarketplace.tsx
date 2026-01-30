import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceMarketplaceTemplate } from "@/components/templates/WorkspaceMarketplaceTemplate/WorkspaceMarketplaceTemplate";
import { type WorkspaceSortOption } from "@/data/workspaceProducts";
import { useGetMyProductsQuery } from "@/store/productsApi";

type StatusTabId = "all" | "active" | "archived";

export default function WorkspaceMarketplace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<StatusTabId>("all");
  const [sortBy, setSortBy] = useState<WorkspaceSortOption>("date");
  const { data: products } = useGetMyProductsQuery();

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleTabChange = (tab: StatusTabId) => {
    setActiveTab(tab);
  };

  const handleOpenPage = (id: string) => {
    navigate(`/product/${id}`);
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
      onOpenPage={handleOpenPage}
      onEdit={handleEdit}
      onViewStats={handleViewStats}
    />
  );
}
