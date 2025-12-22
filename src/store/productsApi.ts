import { baseApi } from "./baseApi";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { getProductDetails, mockReviews, productFaqs, ratingDistribution } from "@/data/details";
import type { Product, ProductDetails, Review, FAQ, RatingDistributionItem } from "@/types";

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
} = productsApi;
