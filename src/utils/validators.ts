import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z.string().email("Неверный формат email");

/**
 * Password validation schema (minimum 8 characters)
 */
export const passwordSchema = z
  .string()
  .min(8, "Пароль должен содержать минимум 8 символов");

/**
 * User profile validation schema
 */
export const userProfileSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  description: z.string().optional(),
});

/**
 * Product validation schema
 */
export const productSchema = z.object({
  title: z.string().min(3, "Название должно содержать минимум 3 символа"),
  description: z.string().min(10, "Описание должно содержать минимум 10 символов"),
  price: z.number().min(0, "Цена не может быть отрицательной"),
  category: z.string().min(1, "Выберите категорию"),
});
