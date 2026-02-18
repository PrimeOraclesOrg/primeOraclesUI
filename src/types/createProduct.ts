/**
 * Types for the Create Product form
 */
import { CreateProductFormData } from "@/utils/validators/createProduct";

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
  title: "",
  description: "",
  mediaUrl: undefined,
  isActive: true,
  advantages: [],
  faq: [],
  instructions: "",
  price: 4,
  category_l1_id: "",
  category_l2_id: "",
};

export interface CreateProductResponse {
  id: string;
  cover_url: string;
}
