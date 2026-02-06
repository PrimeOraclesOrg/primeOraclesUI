import { WorkspaceMarketplaceTabs, WorkspaceSortOption } from "@/types/workspace";

export const workspaceStatusTabs: Array<{ id: WorkspaceMarketplaceTabs; label: string }> = [
  { id: "all", label: "Все статусы" },
  { id: "active", label: "Активные" },
  { id: "inactive", label: "В архиве" },
] as const;

export const workspaceSortOptions: Array<{ id: WorkspaceSortOption; label: string }> = [
  { id: "created_at_desc", label: "Дата создания" },
  { id: "title_asc", label: "Название" },
  { id: "price_desc", label: "Цена" },
  { id: "rating_desc", label: "Рейтинг" },
  { id: "popularity_desc", label: "Популярность" },
] as const;
