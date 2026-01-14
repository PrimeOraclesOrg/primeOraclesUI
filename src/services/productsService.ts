/**
 * Products Service
 *
 * Data access layer for products. Currently uses mock data.
 * When Supabase is integrated, this will use the Supabase client.
 */

import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { getProductDetails, mockReviews, productFaqs, ratingDistribution } from "@/data/details";
import type { Product, ProductDetails, Review, FAQ, RatingDistributionItem } from "@/types";

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

/**
 * Fetch products with optional filtering
 */
export async function fetchProducts(filter: ProductsFilter = {}): Promise<ProductsResult> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('category', filter.category)
  //   .ilike('title', `%${filter.searchQuery}%`)
  //   .range(filter.offset, filter.offset + filter.limit);

  let filtered = [...mockProducts];

  if (filter.category && filter.category !== "Все") {
    filtered = filtered.filter((p) => p.category === filter.category);
  }

  if (filter.searchQuery) {
    const query = filter.searchQuery.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(query));
  }

  return {
    products: filtered,
    categories: productCategories,
    total: filtered.length,
  };
}

/**
 * Fetch products for home page
 */
export async function fetchHomeProducts(): Promise<Product[]> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('featured', true)
  //   .limit(3);

  return homePageProducts;
}

/**
 * Fetch single product details by ID
 */
export async function fetchProductById(id: string): Promise<ProductDetailsResult> {
  // TODO: Replace with Supabase query
  // const { data: product, error } = await supabase
  //   .from('products')
  //   .select('*, reviews(*), faqs(*)')
  //   .eq('id', id)
  //   .single();

  const product = getProductDetails(id);

  return {
    product,
    reviews: mockReviews,
    faqs: productFaqs,
    ratingDistribution,
  };
}

/**
 * Create a new product
 */
export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  // TODO: Replace with Supabase insert
  // const { data, error } = await supabase
  //   .from('products')
  //   .insert(product)
  //   .select()
  //   .single();

  throw new Error("Not implemented - requires Supabase integration");
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  // TODO: Replace with Supabase update
  // const { data, error } = await supabase
  //   .from('products')
  //   .update(updates)
  //   .eq('id', id)
  //   .select()
  //   .single();

  throw new Error("Not implemented - requires Supabase integration");
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<void> {
  // TODO: Replace with Supabase delete
  // const { error } = await supabase
  //   .from('products')
  //   .delete()
  //   .eq('id', id);

  throw new Error("Not implemented - requires Supabase integration");
}
