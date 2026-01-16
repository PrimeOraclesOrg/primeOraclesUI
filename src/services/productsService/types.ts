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
