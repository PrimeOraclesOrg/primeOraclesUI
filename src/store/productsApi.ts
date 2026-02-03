import { baseApi } from "./baseApi";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { MyProducts, Product, PublicProductPage, Review } from "@/types";
import {
  fetchProductById,
  createProductService,
  fetchProductComments,
  fetchMyProducts,
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
    getMyProducts: builder.query<MyProducts, FetchMyProductsParams>({
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

    getProductComments: builder.query<Review[], { productId: string; limit?: number }>({
      queryFn: async ({ productId, limit }) => {
        const { data, error } = await fetchProductComments(productId, {
          p_limit: limit,
        });
        return error ? { error } : { data: data ?? [] };
      },
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
  }),
});

export const {
  useGetProductsQuery,
  useGetHomeProductsQuery,
  useGetProductDetailsQuery,
  useGetMyProductsQuery,
  useGetProductCommentsQuery,
  useCreateProductMutation,
} = productsApi;
