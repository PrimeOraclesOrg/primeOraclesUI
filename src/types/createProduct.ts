/**
 * Types for the Create Product form
 */

export const PRODUCT_CATEGORIES = [
  "Софты/боты",
  "Сообщества", 
  "Обучения",
  "Цифровые материалы",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface ProductAdvantage {
  id: string;
  text: string;
}

export interface ProductFAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CreateProductFormData {
  category: ProductCategory;
  name: string;
  description: string;
  mediaUrl?: string;
  advantages: ProductAdvantage[];
  faq: ProductFAQItem[];
  instructions: string;
  price: number;
}

export const DEFAULT_FORM_DATA: CreateProductFormData = {
  category: "Софты/боты",
  name: "",
  description: "",
  mediaUrl: undefined,
  advantages: [],
  faq: [],
  instructions: "",
  price: 4,
};
