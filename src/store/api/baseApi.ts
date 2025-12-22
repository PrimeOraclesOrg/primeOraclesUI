import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base API configuration for RTK Query.
 * 
 * Currently uses fakeBaseQuery for mock data.
 * When Supabase is integrated, replace with:
 * 
 * import { supabase } from "@/integrations/supabase/client";
 * 
 * const supabaseBaseQuery = () => async (args) => {
 *   try {
 *     const { data, error } = await args;
 *     if (error) return { error };
 *     return { data };
 *   } catch (error) {
 *     return { error };
 *   }
 * };
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products", "Rewards", "Learning", "Transactions"],
  endpoints: () => ({}),
});
