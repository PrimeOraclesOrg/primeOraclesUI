/**
 * Products Service
 *
 * Data access layer for products. Currently uses mock data.
 * When Supabase is integrated, this will use the Supabase client.
 */

import { PostgrestError } from "@supabase/supabase-js";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { FullProfile, Product, PublicProductPage, Review, ServiceError } from "@/types";
import { Json } from "@/types/supabase";
import { PRODUCT_IMAGES_BUCKET, supabase, normalizeError } from "@/utils";
import { formatDate } from "@/utils/formatters";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import { buildCoverUrl } from "@/utils/base64ToBlob";
import { ProductsFilter, ProductsResult } from "./types";

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
export async function fetchProductById(
  id: string
): Promise<{ data: PublicProductPage | null; error: ServiceError | null }> {
  try {
    const { data: product, error } = await supabase.rpc("get_public_product_page", {
      p_product_id: id,
    });

    if (error) {
      throw error;
    }

    if (!product[0]) {
      throw new PostgrestError({
        message: "Product not found",
        details: "Product not found",
        hint: "product_not_found",
        code: "product_not_found",
      });
    }

    return {
      data: {
        ...product[0],
        cover_url: buildCoverUrl(product[0].cover_url),
        creator: product[0].creator as unknown as FullProfile,
      } as PublicProductPage,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
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
export async function createProductService(
  productData: CreateProductFormData,
  mediaFile?: File | null
): Promise<{ data: string | null; error: ServiceError | null }> {
  try {
    // Check title availability
    const { error: availabilityError } = await checkProductTitleAvailability(productData.title);
    if (availabilityError) {
      throw availabilityError;
    }

    // Create the product
    const { data: productId, error: createError } = await supabase.rpc("app_create_product", {
      p_title: productData.title,
      p_category: productData.category,
      p_description: productData.description,
      p_price: productData.price,
      p_instructions: productData.instructions,
      p_advantages: productData.advantages,
      p_faq: productData.faq,
      p_is_active: productData.isActive,
    });

    if (createError) {
      throw createError;
    }

    // Upload image if provided
    if (mediaFile && productId) {
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(productId, mediaFile, { contentType: mediaFile.type, upsert: true });

      if (uploadError) {
        throw uploadError;
      }
    }

    return { data: productId, error: null };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Fetch product comments by product ID
 */
export async function fetchProductComments(
  productId: string,
  options?: { p_limit?: number; p_cursor?: Json; p_rating?: number }
): Promise<{ data: Review[] | null; error: ServiceError | null }> {
  try {
    const { data: rows, error } = await supabase.rpc("app_product_comments", {
      p_product_id: productId,
      ...options,
    });

    if (error) {
      throw error;
    }

    if (rows.length === 0) {
      throw new PostgrestError({
        message: "No comments found for product",
        details: "No comments found for product",
        hint: "no_comments_found_for_product",
        code: "no_comments_found_for_product",
      });
    }

    const reviews = rows.map((review) => ({
      ...review,
      created_at: formatDate(review.created_at),
    }));

    return { data: reviews as Review[], error: null };
  } catch (error) {
    return normalizeError(error);
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
