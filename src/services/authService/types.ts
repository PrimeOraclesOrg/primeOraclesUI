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

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResult<T> {
  data: T | null;
  error: AuthError | null;
}

export interface GetSocialMediasArgs {
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
}
