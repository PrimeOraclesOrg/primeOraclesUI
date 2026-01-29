import { FAQ, Product, ProductDetails, RatingDistributionItem, Review } from "@/types";

export interface ProductsFilter {
  category?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export interface ProductsResult {
  products: Product[];
  categories: string[];
  total: number;
}

export interface ProductDetailsResult {
  product: ProductDetails;
  reviews: Review[];
  faqs: FAQ[];
  ratingDistribution: RatingDistributionItem[];
}

export interface FetchMyProductsParams {
  p_status?: "all" | "active" | "inactive";
  p_sort?:
    | "created_at_desc"
    | "created_at_asc"
    | "title_asc"
    | "title_desc"
    | "rating_desc"
    | "rating_asc"
    | "price_desc"
    | "price_asc"
    | "popularity_desc";
  p_limit?: number; /* 1-50  */
  p_cursor?: { id: string; created_at: string } | null;
}
