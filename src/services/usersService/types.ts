import { SocialLink } from "@/types";

export interface UserProfileUpdate {
  name?: string;
  description?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
}

export interface ServiceResult<T> {
  data: T | null;
  error: { message: string } | null;
}
