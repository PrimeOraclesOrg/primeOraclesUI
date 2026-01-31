import { baseApi } from "./baseApi";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { Product, PublicProductPage, Review } from "@/types";
import {
  fetchProductById,
  createProductService,
  fetchProductComments,
} from "@/services/productsService/productsService";
import { CreateProductFormData } from "@/utils/validators/createProduct";

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
  useGetProductCommentsQuery,
  useCreateProductMutation,
} = productsApi;
