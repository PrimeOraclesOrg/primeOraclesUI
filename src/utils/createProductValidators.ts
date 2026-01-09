import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/types/createProduct";

/**
 * Validation schemas for the Create Product form
 */

export const productCategorySchema = z.enum(PRODUCT_CATEGORIES, {
  errorMap: () => ({ message: "Выберите категорию" }),
});

export const productNameSchema = z
  .string()
  .trim()
  .min(10, "Название должно содержать минимум 10 символов")
  .max(100, "Название не может превышать 100 символов");

export const productDescriptionSchema = z
  .string()
  .trim()
  .min(10, "Описание должно содержать минимум 10 символов")
  .max(1000, "Описание не может превышать 1000 символов");

export const productAdvantageSchema = z
  .string()
  .trim()
  .min(5, "Преимущество должно содержать минимум 5 символов")
  .max(100, "Преимущество не может превышать 100 символов");

export const productFaqQuestionSchema = z
  .string()
  .trim()
  .min(3, "Вопрос должен содержать минимум 3 символа")
  .max(100, "Вопрос не может превышать 100 символов");

export const productFaqAnswerSchema = z
  .string()
  .trim()
  .min(5, "Ответ должен содержать минимум 5 символов")
  .max(300, "Ответ не может превышать 300 символов");

export const productInstructionsSchema = z
  .string()
  .trim()
  .min(10, "Инструкции должны содержать минимум 10 символов")
  .max(1000, "Инструкции не могут превышать 1000 символов");

export const productPriceSchema = z
  .number()
  .min(4, "Минимальная цена 4€");

export const createProductSchema = z.object({
  category: productCategorySchema,
  name: productNameSchema,
  description: productDescriptionSchema,
  mediaUrl: z.string().optional(),
  advantages: z
    .array(
      z.object({
        id: z.string(),
        text: productAdvantageSchema,
      })
    )
    .max(5, "Максимум 5 преимуществ"),
  faq: z
    .array(
      z.object({
        id: z.string(),
        question: productFaqQuestionSchema,
        answer: productFaqAnswerSchema,
      })
    )
    .max(5, "Максимум 5 вопросов"),
  instructions: productInstructionsSchema,
  price: productPriceSchema,
});

export type CreateProductFormSchema = z.infer<typeof createProductSchema>;
