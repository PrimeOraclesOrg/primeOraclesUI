import { SocialMedia } from "@/types";

export interface UserProfileUpdate {
  name?: string;
  description?: string;
  avatar?: string;
  socialLinks?: SocialMedia[];
}

export interface ServiceResult<T> {
  data: T | null;
  error: { message: string } | null;
}
