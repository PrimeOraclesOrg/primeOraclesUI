/**
 * Products Service
 *
 * Data access layer for products. Currently uses mock data.
 * When Supabase is integrated, this will use the Supabase client.
 */

import { PostgrestError } from "@supabase/supabase-js";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import {
  EditorProductPage,
  FullProfile,
  HomeProductCard,
  MyProduct,
  Product,
  ProductCategory,
  ProductCommentsResponse,
  PublicProductCard,
  PublicProductPage,
  Review,
  ServiceError,
} from "@/types";
import { PRODUCT_IMAGES_BUCKET, supabase, normalizeError } from "@/utils";
import { formatDate } from "@/utils/formatters";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import { buildCoverUrl } from "@/utils/base64ToBlob";
import { FetchMyProductsParams, SearchProductsParams } from "./types";
import { CreateProductResponse } from "@/types/createProduct";

export async function fetchMyProducts({
  p_cursor,
  p_limit,
  p_sort,
  p_status,
}: FetchMyProductsParams) {
  try {
    const { data, error } = await supabase.rpc("app_get_my_products", {
      p_cursor,
      p_limit,
      p_sort,
      p_status,
    });

    if (error) throw error;
    return {
      data: data.map((product) => ({
        ...product,
        cover_url: buildCoverUrl(product.cover_url),
      })) as unknown as Array<MyProduct>,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function fetchEditorProductPage(id: string) {
  try {
    const { data, error } = await supabase
      .rpc("get_editor_product_page", { p_product_id: id })
      .single();

    if (error) throw error;

    return {
      data: {
        ...data,
        cover_url: buildCoverUrl(data.cover_url),
      } as unknown as EditorProductPage,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Fetch products with optional filtering
 */
export async function fetchProducts(filter: SearchProductsParams) {
  try {
    const { data, error } = await supabase.rpc("app_search_products", filter);
    if (error) throw error;

    return {
      data: data.map((product) => ({
        ...product,
        cover_url: buildCoverUrl(product.cover_url),
      })) as unknown as PublicProductCard[],
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Fetch product categories
 */
export async function fetchCategoriesForProducts() {
  try {
    const { data, error } = await supabase.from("product_categories_view").select("*");

    if (error) throw error;

    return {
      data: data as Array<ProductCategory>,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Fetch products for home page
 */
export async function fetchHomeProducts(): Promise<HomeProductCard[]> {
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
      } as unknown as PublicProductPage,
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
    const { data, error: createError } = (await supabase.rpc("app_create_product", {
      p_title: productData.title,
      p_category_l1_id: productData.category_l1_id,
      p_category_l2_id: productData.category_l2_id,
      p_description: productData.description,
      p_price: productData.price,
      p_instructions: productData.instructions,
      p_advantages: productData.advantages,
      p_faq: productData.faq,
      p_is_active: productData.isActive,
    })) as { data: CreateProductResponse; error: PostgrestError };

    if (createError) {
      throw createError;
    }

    // Upload image if provided
    if (mediaFile && data.cover_url) {
      const uploadPath = data.cover_url.replace(`${PRODUCT_IMAGES_BUCKET}/`, "");
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(uploadPath, mediaFile, { contentType: mediaFile.type, upsert: true });

      if (uploadError) {
        throw uploadError;
      }
    }

    return { data: data.id, error: null };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function updateProductService(
  productId: string,
  productData: CreateProductFormData,
  mediaFile?: File | null,
  oldCoverPath?: string
): Promise<{ data: string | null; error: ServiceError | null }> {
  try {
    const { data: newCoverUrl, error: updateError } = await supabase.rpc("app_update_product", {
      p_product_id: productId,
      p_title: productData.title,
      p_category_l1_id: productData.category_l1_id,
      p_category_l2_id: productData.category_l2_id,
      p_description: productData.description,
      p_price: productData.price,
      p_instructions: productData.instructions,
      p_advantages: productData.advantages,
      p_faq: productData.faq,
      p_is_active: productData.isActive,
      p_refresh_cover: !!mediaFile,
    });

    if (updateError) {
      throw updateError;
    }

    // Upload image if provided
    if (mediaFile && newCoverUrl) {
      const newUploadPath = newCoverUrl.replace(`${PRODUCT_IMAGES_BUCKET}/`, "");
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(newUploadPath, mediaFile, { contentType: mediaFile.type, upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      if (oldCoverPath) {
        const { error: oldCoverRemoveError } = await supabase.storage
          .from(PRODUCT_IMAGES_BUCKET)
          .remove([oldCoverPath]);

        if (oldCoverRemoveError) throw oldCoverRemoveError;
      }
    }

    return { data: productId, error: null };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Fetch product comments by product ID with optional pagination
 */
export async function fetchProductComments(
  productId: string,
  options?: { p_page?: number; p_rating?: number }
): Promise<{ data: ProductCommentsResponse | null; error: ServiceError | null }> {
  try {
    const { data: rows, error } = await supabase.rpc("app_product_comments", {
      p_product_id: productId,
      ...options,
    });

    if (error) {
      throw error;
    }

    if (rows.length === 0) {
      return { data: { comments: [], totalPages: 0 }, error: null };
    }

    const reviews = rows.map((review) => ({
      ...review,
      created_at: formatDate(review.created_at),
    })) as Review[];

    const totalPages = rows[0].total_pages;

    return { data: { comments: reviews, totalPages }, error: null };
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
export async function updateProduct(
  id: string,
  productData: CreateProductFormData,
  mediaFile?: File | null
): Promise<Product> {
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

/**
 * Purchase a product
 */

export async function purchaseProduct(productId: string) {
  try {
    const { data: product, error: productFetchError } = await fetchProductById(productId);
    if (productFetchError) throw productFetchError;

    const { data: purchaseId, error: createPurchaseError } = await supabase.rpc(
      "rpc_create_purchase",
      {
        p_product_id: productId,
      }
    );
    if (createPurchaseError) throw createPurchaseError;

    const { error: createPaymentError } = await supabase.functions.invoke("create_payment", {
      body: {
        purchase_id: purchaseId,
        status: "paid",
        payment_amount_usd: product.price.toFixed(2),
      },
    });
    if (createPaymentError) throw createPaymentError;

    const { error: testPaymentError } = await testPayment(product, purchaseId);
    if (testPaymentError) throw testPaymentError;
  } catch (error) {
    return normalizeError(error);
  }
}

async function testPayment(product: PublicProductPage, purchaseId: string) {
  try {
    const { error } = await supabase.functions.invoke("payment_webhook", {
      body: {
        uuid: crypto.randomUUID(),
        order_id: purchaseId,
        status: "paid",
        payment_amount_usd: product.price.toFixed(2),
      },
    });

    if (error) throw error;
  } catch (error) {
    return normalizeError(error);
  }
}
