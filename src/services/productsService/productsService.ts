/**
 * Products Service
 *
 * Data access layer for products. Currently uses mock data.
 * When Supabase is integrated, this will use the Supabase client.
 */

import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { getProductDetails, mockReviews, productFaqs, ratingDistribution } from "@/data/details";
import type { Product } from "@/types";
import { supabase } from "@/utils";
import { ProductDetailsResult, ProductsFilter, ProductsResult } from "./types";
import { CreateProductFormData } from "@/utils/validators/createProduct";

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
 * Check if a product title is available
 */
export async function checkProductTitleAvailability(title: string): Promise<void> {
  const { data, error } = await supabase.rpc("app_check_product_title_availability", {
    p_title: title,
  });

  if (error) {
    throw new Error("Ошибка про проверке названия продукта");
  }

  const response = data as {
    available: boolean;
    valid: boolean;
    error: string | null;
  } | null;

  if (!response || !response.available) {
    throw new Error("Продукт с таким названием уже существует");
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: CreateProductFormData): Promise<string> {
  const { data, error } = await supabase.rpc("app_create_product", {
    p_title: productData.title,
    p_category: productData.category,
    p_description: productData.description,
    p_price: productData.price.toString(),
    p_instructions: productData.instructions,
    p_advantages: productData.advantages,
    p_faq: productData.faq,
    p_is_active: productData.isActive,
  });

  if (error) {
    throw new Error("Ошибка при создании продукта");
  }

  return data;
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
