import { FullProfile } from "./models";
import { Database } from "./supabase";

export type FAQ = {
  position: number;
  question: string;
  answer: string;
};

export type Advantage = {
  position: number;
  description: string;
};

export type Review = Database["public"]["Functions"]["app_product_comments"]["Returns"][0];

export type PublicProductPage = Omit<
  Database["public"]["Functions"]["get_public_product_page"]["Returns"][0],
  "creator" | "faq" | "advantages"
> & {
  creator: FullProfile;
  faq: FAQ[];
  advantages: Advantage[];
};
