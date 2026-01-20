/**
 * Auth Service
 *
 * Authentication logic for the application.
 * Prepared for Supabase Auth integration.
 */

import { base64ToBlob, supabase } from "@/utils";
import { Session, User } from "@supabase/supabase-js";
import {
  AuthResult,
  SignInCredentials,
  SignUpCredentials,
  UserAndSession,
  VerifyOtpCredentials,
} from "./types";

/**
 * Sign up a new user with email and password
 */
export async function signUp(credentials: SignUpCredentials): Promise<AuthResult<UserAndSession>> {
  const { data, error } = await supabase.auth
    .signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: credentials.metadata,
      },
    })
    .catch((error) => error);

  return {
    data,
    error,
  };
}

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials): Promise<AuthResult<UserAndSession>> {
  const { data, error } = await supabase.auth
    .signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })
    .catch((error) => ({ data: null, error }));

  return {
    data,
    error,
  };
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult<null>> {
  const { error } = await supabase.auth.signOut().catch((error) => ({ data: null, error }));

  return {
    data: null,
    error,
  };
}

/**
 * Get the current session
 */
export async function getSession(): Promise<AuthResult<Session>> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession().catch((error) => ({ data: null, error }));

  return {
    data: session,
    error,
  };
}

/**
 * Get the current user
 */
export async function getCurrentUser(): Promise<AuthResult<User>> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser().catch((error) => ({ data: null, error }));

  return {
    data: user,
    error,
  };
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult<null>> {
  const { error } = await supabase.auth
    .resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    .catch((error) => ({ data: null, error }));

  return {
    data: null,
    error,
  };
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string): Promise<AuthResult<{ user: User }>> {
  const { data, error } = await supabase.auth
    .updateUser({
      password: newPassword,
    })
    .catch((error) => ({ data: null, error }));

  return {
    data,
    error,
  };
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
): () => void {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);
  return () => subscription.unsubscribe();
}

export async function verifyOtp({
  code,
  ...params
}: VerifyOtpCredentials): Promise<AuthResult<UserAndSession>> {
  const { data, error } = await supabase.auth
    .verifyOtp({ ...params, token: code })
    .catch((error) => ({ data: null, error }));

  return {
    data,
    error,
  };
}

export async function resendSignUpOtp(email: string): Promise<AuthResult<UserAndSession>> {
  const { data, error } = await supabase.auth.resend({ email, type: "signup" });

  return {
    data,
    error,
  };
}

export async function checkUsernameAvailability(username: string) {
  const { error } = await supabase.rpc("app_check_username_availability", {
    p_username: username,
  });

  if (error)
    return {
      data: null,
      error: {
        code: error.hint || error.code,
        message: error.message,
      },
    };
}

export async function uploadAvatar(avatarBase64: string, userId: string) {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(userId, base64ToBlob(avatarBase64), {
      contentType: "image/png",
    })
    .catch((error) => ({ data: null, error }));

  if (error)
    return {
      data: null,
      error: {
        code: error?.name,
        message: error?.message,
      },
    };
}

export async function profile_registration_update(
  username: string,
  name: string,
  description: string,
  avatarName: string | null,
  socialMedias: Array<{
    type: string;
    link: string;
  } | null>
) {
  const { error } = await supabase.rpc("app_profile_registration_update", {
    p_username: username,
    p_name: name,
    p_bio: description || null,
    p_default_avatar_name: avatarName,
    p_social_medias: socialMedias,
  });

  return {
    data: null,
    error: error && {
      code: error.hint || error.code,
      message: error.message,
    },
  };
}

/**
 * Profile data for completing user profile
 */
export interface ProfileData {
  name: string;
  username: string;
  description?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl: string;
  selectedAvatar: string | null;
  uploadedAvatar: string;
}

/**
 * Complete user profile after registration (mock implementation)
 */
export async function completeProfile({
  name,
  username,
  description,
  instagramUrl,
  selectedAvatar,
  tiktokUrl,
  uploadedAvatar,
  youtubeUrl,
}: ProfileData): Promise<AuthResult<null>> {
  const getAvatarName = () => {
    const avatarNumber = Number(selectedAvatar);
    if (!avatarNumber) return null;
    return `avatar${avatarNumber}.png`;
  };

  const getSocialMedias = () => {
    if (!instagramUrl && !youtubeUrl && !tiktokUrl) return null;
    return [
      instagramUrl && {
        type: "instagram",
        link: instagramUrl,
      },
      youtubeUrl && {
        type: "youtube",
        link: youtubeUrl,
      },
      tiktokUrl && {
        type: "tiktok",
        link: tiktokUrl,
      },
    ].filter(Boolean);
  };

  const { data: user, error: userError } = await getCurrentUser();
  if (userError) return { data: null, error: userError };

  const usernameAvailability = await checkUsernameAvailability(username);
  if (usernameAvailability?.error) return usernameAvailability;

  if (!getAvatarName() && uploadedAvatar) {
    const avatarUploading = await uploadAvatar(uploadedAvatar, user.id);
    if (avatarUploading?.error) return avatarUploading;
  }

  const updateProfileRegistration = await profile_registration_update(
    username,
    name,
    description,
    getAvatarName(),
    getSocialMedias()
  );
  return updateProfileRegistration;
}

export async function getUserProfile() {
  const { data, error } = await supabase.from("public_profiles_full_view").select("*").single();
  return {
    data,
    error,
  };
}
