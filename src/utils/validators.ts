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
 * URL schema for social links (optional)
 */
const optionalUrlSchema = z
  .string()
  .max(2048, "Ссылка не должена превышать 2048 символов")
  .regex(/^https:\/\/[^\s<>"{}|\\^`[\]]+$/, "Не верный формат ссылки")
  /* .refine((val) => val === "" || /^https?:\/\/.+/.test(val), "Неверный формат ссылки") */
  .optional()
  .or(z.literal(""));

/**
 * Profile setup form schema
 */

export const profileSetupMaxLenghtLimits = {
  name: 60,
  username: 32,
  description: 500,
};

export const profileSetupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Имя обязательно")
    .min(3, "Имя должено содержать минимум 3 символа")
    .max(profileSetupMaxLenghtLimits.name, "Имя не должно превышать 120 символов"),
  username: z
    .string()
    .trim()
    .min(1, "Никнейм обязателен")
    .min(3, "Никнейм должен содержать минимум 3 символа")
    .max(profileSetupMaxLenghtLimits.username, "Никнейм не должен превышать 64 символов")
    .regex(/^[a-zA-Z0-9]+$/, "Никнейм может содержать только цифры и английские буквы"),
  description: z
    .string()
    .min(3, "Описание должено содержать минимум 3 символа")
    .max(profileSetupMaxLenghtLimits.description, "Описание не должно превышать 500 символов")
    .optional()
    .or(z.literal("")),
  youtubeUrl: optionalUrlSchema,
  instagramUrl: optionalUrlSchema,
  tiktokUrl: optionalUrlSchema,
  selectedAvatar: z.string(),
  uploadedAvatar: z.string(),
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
export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
export type VerificationCodeFormData = z.infer<typeof verificationCodeSchema>;
