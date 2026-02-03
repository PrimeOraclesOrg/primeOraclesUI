import { FAQ, Product, ProductDetails, RatingDistributionItem, Review } from "@/types";
import { Database } from "@/types/supabase";

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

export type FetchMyProductsParams = Omit<
  Database["public"]["Functions"]["app_get_my_products"]["Args"],
  "p_cursor"
> & {
  p_cursor?: { id: string; created_at: string } | null;
};
