import { baseApi } from "./baseApi";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { getProductDetails, mockReviews, productFaqs, ratingDistribution } from "@/data/details";
import type {
  Product,
  ProductDetails,
  Review,
  FAQ,
  RatingDistributionItem,
  MyProducts,
} from "@/types";
import { FetchMyProductsParams } from "@/services/productsService/types";
import { fetchMyProducts } from "@/services";

interface ProductsQueryArgs {
  category?: string;
  searchQuery?: string;
}

interface ProductsResponse {
  products: Product[];
  categories: string[];
}

interface ProductDetailsResponse {
  product: ProductDetails;
  reviews: Review[];
  faqs: FAQ[];
  ratingDistribution: RatingDistributionItem[];
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

    getProductDetails: builder.query<ProductDetailsResponse, string>({
      queryFn: (id) => {
        const product = getProductDetails(id);
        return {
          data: {
            product,
            reviews: mockReviews,
            faqs: productFaqs,
            ratingDistribution,
          },
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetHomeProductsQuery,
  useGetProductDetailsQuery,
  useGetMyProductsQuery,
} = productsApi;
