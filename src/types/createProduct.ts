/**
 * Types for the Create Product form
 */

import { CreateProductFormData } from "@/utils/validators/createProduct";
import { Constants, Database } from "./supabase";

export const PRODUCT_CATEGORIES = Constants.public.Enums.product_category;

export type ProductCategory = Database["public"]["Enums"]["product_category"];

export const CATEGORY_DISPLAY_NAMES: Record<ProductCategory, string> = {
  "Soft/Bot": "Софты/боты",
  Community: "Сообщества",
  Course: "Обучения",
  "Digital Material": "Цифровые материалы",
} as const;

export function getCategoryDisplayName(category: string): string {
  return CATEGORY_DISPLAY_NAMES[category];
}

export interface ProductAdvantage {
  description: string;
  position: number;
}

export interface ProductFAQItem {
  question: string;
  answer: string;
  position: number;
}

export const DEFAULT_FORM_DATA: CreateProductFormData = {
  category: PRODUCT_CATEGORIES[0],
  title: "",
  description: "",
  mediaUrl: undefined,
  isActive: true,
  advantages: [],
  faq: [],
  instructions: "",
  price: 4,
};
