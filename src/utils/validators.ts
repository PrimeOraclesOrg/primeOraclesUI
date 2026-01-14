import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email обязателен")
  .email("Неверный формат email")
  .max(255, "Email слишком длинный");

/**
 * Password validation schema (minimum 8 characters)
 */
export const passwordSchema = z
  .string()
  .min(1, "Пароль обязателен")
  .min(8, "Пароль должен содержать минимум 8 символов")
  .max(128, "Пароль слишком длинный");

/**
 * Confirm password schema (for registration/reset)
 */
export const confirmPasswordSchema = z.string().min(1, "Подтверждение пароля обязательно");

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Пароль обязателен"),
});

/**
 * Registration form schema
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Reset password schema
 */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

/**
 * Verification code schema
 */
export const verificationCodeSchema = z.object({
  code: z
    .string()
    .length(8, "Код должен содержать 8 символов")
    .regex(/^\d+$/, "Код должен содержать только цифры"),
});

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

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type VerificationCodeFormData = z.infer<typeof verificationCodeSchema>;
