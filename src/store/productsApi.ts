import { baseApi } from "./baseApi";
import { homePageProducts } from "@/data/products";
import {
  EditorProductPage,
  HomeProductCard,
  MyProduct,
  Product,
  ProductCategory,
  ProductCommentsResponse,
  PublicProductCard,
  PublicProductPage,
} from "@/types";
import {
  fetchProductById,
  createProductService,
  fetchProductComments,
  fetchMyProducts,
  fetchCategoriesForProducts,
  fetchEditorProductPage,
  updateProductService,
  fetchProducts,
  purchaseProduct,
} from "@/services/productsService/productsService";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import { FetchMyProductsParams, SearchProductsParams } from "@/services/productsService/types";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProducts: builder.query<MyProduct[], FetchMyProductsParams>({
      queryFn: async (params) => {
        const { data, error } = await fetchMyProducts(params);
        if (error) return { error };
        return { data };
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (!queryArgs) {
          return `${endpointName}-default-all`;
        }

        const { p_sort = "created_at_desc", p_status = "all" } = queryArgs;
        return `${endpointName}-${p_sort}-${p_status}`;
      },

      merge: (currentCache, newItems, { arg }) => {
        if (!arg.p_cursor) {
          return newItems;
        }
        return [...currentCache, ...newItems];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Products"],
    }),

    getEditorProductPage: builder.query<EditorProductPage, string>({
      queryFn: async (id) => {
        const { data, error } = await fetchEditorProductPage(id);
        if (error) return { error };
        return { data };
      },
      providesTags: ["Products"],
    }),

    getProducts: builder.query<PublicProductCard[], SearchProductsParams>({
      queryFn: async (params) => {
        const { data, error } = await fetchProducts(params);
        if (error) return { error };
        return { data };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (!queryArgs) {
          return `${endpointName}-default`;
        }

        const { p_sort = "created_at_desc" } = queryArgs;
        return `${endpointName}-${p_sort}`;
      },

      merge: (currentCache, newItems, { arg }) => {
        if (!arg.p_cursor) {
          return newItems;
        }
        return [...currentCache, ...newItems];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Products"],
    }),

    getCategoriesForProducts: builder.query<ProductCategory[], void>({
      queryFn: async () => {
        const { data, error } = await fetchCategoriesForProducts();
        if (error) return { error };

        return { data };
      },
    }),

    getHomeProducts: builder.query<HomeProductCard[], void>({
      queryFn: () => {
        return { data: homePageProducts };
      },
      providesTags: ["Products"],
    }),

    getProductDetails: builder.query<PublicProductPage | null, string>({
      queryFn: async (id) => {
        const { data, error } = await fetchProductById(id);
        return error ? { error } : { data };
      },
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    getProductComments: builder.query<
      ProductCommentsResponse,
      { productId: string; page: number; rating: number | null }
    >({
      queryFn: async ({ productId, page, rating }) => {
        const { data, error } = await fetchProductComments(productId, {
          p_page: page,
          p_rating: rating ?? undefined,
        });
        return error ? { error } : { data };
      },
      keepUnusedDataFor: 300,
      providesTags: (_result, _error, { productId }) => [
        { type: "Products", id: productId },
        { type: "ProductComments", id: productId },
      ],
    }),

    createProduct: builder.mutation<
      string,
      { productData: CreateProductFormData; mediaFile?: File | null }
    >({
      queryFn: async ({ productData, mediaFile }) => {
        const { data, error } = await createProductService(productData, mediaFile);
        return error ? { error } : { data };
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<
      string,
      {
        productId: string;
        productData: CreateProductFormData;
        oldCoverPath?: string;
        mediaFile?: File | null;
      }
    >({
      queryFn: async ({ productId, productData, oldCoverPath, mediaFile }) => {
        const { data, error } = await updateProductService(
          productId,
          productData,
          mediaFile,
          oldCoverPath
        );
        return error ? { error } : { data };
      },
      invalidatesTags: ["Products"],
    }),
    purchaseProduct: builder.mutation<void, { productId: string; productPrice: string }>({
      queryFn: async ({ productId, productPrice }) => {
        const { error } = await purchaseProduct(productId, productPrice);
        if (error) return { error };
        return { data: null };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetHomeProductsQuery,
  useGetProductDetailsQuery,
  useGetMyProductsQuery,
  useGetProductCommentsQuery,
  useCreateProductMutation,
  useGetCategoriesForProductsQuery,
  useGetEditorProductPageQuery,
  useUpdateProductMutation,
  usePurchaseProductMutation,
} = productsApi;
