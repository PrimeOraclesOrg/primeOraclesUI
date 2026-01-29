import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceMarketplaceTemplate } from "@/components/templates/WorkspaceMarketplaceTemplate/WorkspaceMarketplaceTemplate";
import { mockWorkspaceProducts, type WorkspaceSortOption } from "@/data/workspaceProducts";
import { useGetMyProductsQuery } from "@/store/productsApi";

type StatusTabId = "all" | "active" | "archived";

const ITEMS_PER_PAGE = 5;

export default function WorkspaceMarketplace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<StatusTabId>("all");
  const [sortBy, setSortBy] = useState<WorkspaceSortOption>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetMyProductsQuery();

  useEffect(() => {
    console.log("data:", data);
  }, [data]);

  const filteredProducts = useMemo(() => {
    let products = [...mockWorkspaceProducts];

    // Filter by status
    if (activeTab !== "all") {
      products = products.filter((p) => p.status === activeTab);
    }

    // Sort products
    switch (sortBy) {
      case "date":
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "name":
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return products;
  }, [activeTab, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleTabChange = (tab: StatusTabId) => {
    setActiveTab(tab);
    setCurrentPage(1);
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
      products={paginatedProducts}
      activeTab={activeTab}
      sortBy={sortBy}
      currentPage={currentPage}
      totalPages={totalPages}
      onTabChange={handleTabChange}
      onSortChange={setSortBy}
      onPageChange={setCurrentPage}
      onOpenPage={handleOpenPage}
      onEdit={handleEdit}
      onViewStats={handleViewStats}
    />
  );
}
