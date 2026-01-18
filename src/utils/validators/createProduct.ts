import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/types/createProduct";

/**
 * Validation schemas for the Create Product form
 */

export const productCategorySchema = z.enum(PRODUCT_CATEGORIES, {
  errorMap: () => ({ message: "Выберите категорию" }),
});

export const productTitleSchema = z
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

export const productPriceSchema = z.number().min(4, "Минимальная цена 4€");

export const createProductSchema = z.object({
  category: productCategorySchema,
  title: productTitleSchema,
  description: productDescriptionSchema,
  mediaUrl: z.string().optional(),
  isActive: z.boolean(),
  advantages: z
    .array(
      z.object({
        description: productAdvantageSchema,
        position: z.number(),
      })
    )
    .max(5, "Максимум 5 преимуществ"),
  faq: z
    .array(
      z.object({
        question: productFaqQuestionSchema,
        answer: productFaqAnswerSchema,
        position: z.number(),
      })
    )
    .max(5, "Максимум 5 вопросов"),
  instructions: productInstructionsSchema,
  price: productPriceSchema,
});

export const validateCreateProductData = (values: CreateProductFormData) => {
  const result = createProductSchema.safeParse(values);
  if (result.success) {
    return {};
  }

  const errors: Record<string, unknown> = {};

  result.error.errors.forEach((err) => {
    const path = err.path;

    if (path.length === 1) {
      errors[path[0] as string] = err.message;
    } else if (path[0] === "advantages" && typeof path[1] === "number") {
      if (!errors.advantages) errors.advantages = [];
      (errors.advantages as Record<string, string>[])[path[1]] = {
        ...(errors.advantages as Record<string, string>[])[path[1]],
        [path[2] as string]: err.message,
      };
    } else if (path[0] === "faq" && typeof path[1] === "number") {
      if (!errors.faq) errors.faq = [];
      (errors.faq as Record<string, string>[])[path[1]] = {
        ...(errors.faq as Record<string, string>[])[path[1]],
        [path[2] as string]: err.message,
      };
    }
  });

  return errors;
};

export type CreateProductFormData = z.infer<typeof createProductSchema>;
