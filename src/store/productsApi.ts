import { baseApi } from "./baseApi";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import {
  EditorProductPage,
  MyProduct,
  Product,
  ProductCategory,
  ProductCommentsResponse,
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
} from "@/services/productsService/productsService";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import { FetchMyProductsParams } from "@/services/productsService/types";

interface ProductsQueryArgs {
  category?: string;
  searchQuery?: string;
}

interface ProductsResponse {
  products: Product[];
  categories: string[];
}

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

    getProducts: builder.query<ProductsResponse, ProductsQueryArgs>({
      queryFn: ({ category, searchQuery }) => {
        let filtered = [...mockProducts];

        if (category && category !== "Все") {
          filtered = filtered.filter((p) => p.category === category);
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter((p) => p.title.toLowerCase().includes(query));
        }

        return {
          data: {
            products: filtered,
            categories: productCategories,
          },
        };
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

    getHomeProducts: builder.query<Product[], void>({
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
      { productId: string; productData: CreateProductFormData; mediaFile?: File | null }
    >({
      queryFn: async ({ productId, productData, mediaFile }) => {
        const { data, error } = await updateProductService(productId, productData, mediaFile);
        return error ? { error } : { data };
      },
      invalidatesTags: ["Products"],
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
} = productsApi;
