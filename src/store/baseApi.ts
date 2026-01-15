import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base API configuration for RTK Query.
 *
 * Currently uses fakeBaseQuery for mock data.
 * When Supabase is integrated, replace with supabaseBaseQuery.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products", "Rewards", "Learning", "Transactions"],
  endpoints: () => ({}),
});
