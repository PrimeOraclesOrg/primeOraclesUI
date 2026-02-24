import z from "zod";

export const marketSearchSchema = z.object({
  searchRequest: z.string().optional(),
  category_l1_code: z.string().optional(),
  category_l2_code: z.string().optional(),
  sort_by: z.string().optional(),
});

export type MarketSearchFormData = z.infer<typeof marketSearchSchema>;
