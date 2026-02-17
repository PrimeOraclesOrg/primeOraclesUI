import { Prettify } from "@/utils";
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

export type ProductCommentsResponse = {
  comments: Review[];
  totalPages: number;
};

export type ProductSubCategory = Prettify<
  Omit<Database["public"]["Views"]["product_categories_view"]["Row"], "subcategories">
>;

export type ProductCategory = Prettify<
  ProductSubCategory & {
    subcategories: Array<ProductSubCategory>;
  }
>;

export interface SpecificProductCategory {
  l1: Prettify<Omit<ProductSubCategory, "sort_order">>;
  l2: Prettify<Omit<ProductSubCategory, "sort_order">>;
}

export type PublicProductPage = Prettify<
  Omit<
    Database["public"]["Functions"]["get_public_product_page"]["Returns"][0],
    "creator" | "faq" | "advantages" | "category"
  > & {
    creator: FullProfile;
    faq: FAQ[];
    advantages: Advantage[];
    category: SpecificProductCategory;
  }
>;

export type EditorProductPage = Prettify<
  Omit<
    Database["public"]["Functions"]["get_editor_product_page"]["Returns"][0],
    "faq" | "advantages" | "category"
  > & {
    faq: FAQ[];
    advantages: Advantage[];
    category: SpecificProductCategory;
  }
>;

export type MyProduct = Prettify<
  Omit<Database["public"]["Functions"]["app_get_my_products"]["Returns"][0], "category"> & {
    category: SpecificProductCategory;
  }
>;
