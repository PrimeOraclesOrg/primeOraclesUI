export type WorkspaceProductStatus = "active" | "archived";

export interface WorkspaceProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  reviewCount: number;
  category: string;
  status: WorkspaceProductStatus;
  createdAt: string;
}
