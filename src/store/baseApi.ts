import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServiceError } from "@/types";

/**
 * Base API configuration for RTK Query.
 *
 * Currently uses fakeBaseQuery for mock data.
 * When Supabase is integrated, replace with supabaseBaseQuery.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery<ServiceError>(),
  tagTypes: [
    "Products",
    "ProductComments",
    "Rewards",
    "Learning",
    "Transactions",
    "AuthUser",
    "User",
  ],
  endpoints: () => ({}),
});
