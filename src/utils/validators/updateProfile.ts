import z from "zod";
import {
  instagramUrlSchema,
  profileSetupMaxLenghtLimits,
  tiktokUrlSchema,
  youtubeUrlSchema,
} from "../validators";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Имя обязательно")
    .min(3, "Имя должено содержать минимум 3 символа")
    .max(
      profileSetupMaxLenghtLimits.name,
      `Имя не должно превышать ${profileSetupMaxLenghtLimits.name} символов`
    ),
  description: z
    .string()
    .min(3, "Описание должено содержать минимум 3 символа")
    .max(
      profileSetupMaxLenghtLimits.description,
      `Описание не должно превышать ${profileSetupMaxLenghtLimits.description} символов`
    )
    .optional()
    .or(z.literal("")),
  youtubeUrl: youtubeUrlSchema,
  instagramUrl: instagramUrlSchema,
  tiktokUrl: tiktokUrlSchema,
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
