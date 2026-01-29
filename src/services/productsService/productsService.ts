/**
 * Products Service
 *
 * Data access layer for products. Currently uses mock data.
 * When Supabase is integrated, this will use the Supabase client.
 */

import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { getProductDetails, mockReviews, productFaqs, ratingDistribution } from "@/data/details";
import type { Product } from "@/types";
import { PRODUCT_IMAGES_BUCKET, supabase } from "@/utils";
import {
  FetchMyProductsParams,
  ProductDetailsResult,
  ProductsFilter,
  ProductsResult,
} from "./types";
import { CreateProductFormData } from "@/utils/validators/createProduct";

export async function fetchMyProducts({
  p_cursor = null,
  p_limit = 20,
  p_sort = "created_at_desc",
  p_status = "all",
}: FetchMyProductsParams = {}) {
  try {
    const { data, error } = await supabase.rpc("app_get_my_products", {
      p_cursor,
      p_limit,
      p_sort,
      p_status,
    });

    if (error)
      return {
        data: null,
        error: {
          code: error.hint || error.code,
          message: error.message,
        },
      };
    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
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
 * Check if a product title is available
 */
export async function checkProductTitleAvailability(
  title: string
): Promise<{ data: null; error: { code: string; message: string } | null }> {
  try {
    const { error: availabilityError } = await supabase.rpc(
      "app_check_product_title_availability",
      {
        p_title: title,
      }
    );

    if (availabilityError) {
      return {
        data: null,
        error: {
          code: availabilityError.hint ?? "unexpected_error",
          message: availabilityError.message ?? "Unexpected error",
        },
      };
    }
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: { code: "unexpected_error", message: "Unexpected error" } };
  }
}

/**
 * Create a new product
 */
export async function createProduct(
  productData: CreateProductFormData,
  mediaFile?: File | null
): Promise<{ data: string | null; error: { code: string; message: string } | null }> {
  try {
    // Check title availability
    const { error: availabilityError } = await checkProductTitleAvailability(productData.title);
    if (availabilityError) {
      return { data: null, error: availabilityError };
    }

    // Create the product
    const { data: productId, error: createError } = await supabase.rpc("app_create_product", {
      p_title: productData.title,
      p_category: productData.category,
      p_description: productData.description,
      p_price: productData.price.toString(),
      p_instructions: productData.instructions,
      p_advantages: productData.advantages,
      p_faq: productData.faq,
      p_is_active: productData.isActive,
    });

    if (createError) {
      return {
        data: null,
        error: {
          code: createError.hint ?? "unexpected_error",
          message: createError.message ?? "Unexpected error",
        },
      };
    }

    // Upload image if provided
    if (mediaFile && productId) {
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(productId, mediaFile, { contentType: mediaFile.type, upsert: true });

      if (uploadError) {
        return {
          data: null,
          error: {
            code: "unexpected_error",
            message: "Unexpected error",
          },
        };
      }
    }

    return { data: productId, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

/**
 * Upload product image to Supabase Storage
 */
export async function uploadProductImage(productId: string, file: File) {
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(productId, file, { contentType: file.type, upsert: true });

  if (error) {
    throw new Error("Ошибка при загрузке изображения продукта");
  }
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
