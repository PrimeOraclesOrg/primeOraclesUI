import { Cursor, FAQ, Product, ProductDetails, RatingDistributionItem, Review } from "@/types";
import { Database } from "@/types/supabase";
import { Prettify } from "@/utils";

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
  p_cursor?: Cursor;
};

export type SearchProductsParams = Prettify<
  Omit<Database["public"]["Functions"]["app_search_products"]["Args"], "p_cursor"> & {
    p_cursor?: Cursor;
  }
>;
