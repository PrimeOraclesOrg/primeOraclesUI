/**
 * Types for the Create Product form
 */

import { CreateProductFormData } from "@/utils/validators/createProduct";

export const PRODUCT_CATEGORIES = ["Soft/Bot", "Community", "Course", "Digital Material"] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const CATEGORY_DISPLAY_NAMES: Record<ProductCategory, string> = {
  "Soft/Bot": "Софты/боты",
  Community: "Сообщества",
  Course: "Обучения",
  "Digital Material": "Цифровые материалы",
} as const;

export function getCategoryDisplayName(category: ProductCategory): string {
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

export interface CreateProductFormRequestBody extends CreateProductFormData {
  isActive?: boolean;
}

export const DEFAULT_FORM_DATA: CreateProductFormData = {
  category: PRODUCT_CATEGORIES[0],
  title: "",
  description: "",
  mediaUrl: undefined,
  advantages: [],
  faq: [],
  instructions: "",
  price: 4,
};
