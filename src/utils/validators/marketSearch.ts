import z from "zod";

export const marketSearchSchema = z.object({
  searchRequest: z.string().optional(),
  category_l1: z.string().optional(),
  category_l2: z.string().optional(),
  sort_by: z.string().optional(),
});

export type MarketSearchFormData = z.infer<typeof marketSearchSchema>;
