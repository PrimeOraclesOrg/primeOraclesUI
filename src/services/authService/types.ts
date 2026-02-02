import { ApiError } from "@/types";
import { EmailOtpType, Session, User } from "@supabase/supabase-js";

export interface SignUpCredentials {
  email: string;
  password: string;
  metadata?: {
    firstName?: string;
    lastName?: string;
  };
}

export interface SignInCredentials {
  email?: string;
  password?: string;
}

export interface VerifyOtpCredentials {
  email: string;
  code: string;
  type: EmailOtpType;
}

export type UserAndSession = {
  user: User | null;
  session: Session | null;
};

export interface AuthResult<T> {
  data: T | null;
  error: ApiError | null;
}

export interface GetSocialMediasArgs {
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
}

export interface VerifyOtpForPasswordChangeParams {
  email: string;
  otpToken: string;
}

export interface ChangePasswordParams {
  email: string;
  otpToken: string;
  newPassword: string;
  isCodeVerified: boolean;
}
