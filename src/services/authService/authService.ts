/**
 * Auth Service
 *
 * Authentication logic for the application.
 * Prepared for Supabase Auth integration.
 */

import {
  base64ToBlob,
  normalizeAsyncError,
  normalizeError,
  ProfileSetupFormData,
  supabase,
} from "@/utils";
import { Session, User } from "@supabase/supabase-js";
import {
  AuthResult,
  ChangePasswordParams,
  GetSocialMediasArgs,
  SignInCredentials,
  SignUpCredentials,
  UserAndSession,
  VerifyOtpCredentials,
  VerifyOtpForPasswordChangeParams,
} from "./types";
import { UpdateProfileFormData } from "@/utils/validators/updateProfile";
import { FullProfile, SocialMedia } from "@/types";

/**
 * Sign up a new user with email and password
 */
export async function signUp(credentials: SignUpCredentials): Promise<AuthResult<UserAndSession>> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: credentials.metadata,
      },
    });

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials): Promise<AuthResult<UserAndSession>> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Get the current session
 */
export async function getSession(): Promise<AuthResult<Session>> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    return {
      data: session,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser(): Promise<AuthResult<User>> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return {
      data: user,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Send password change email
 */
export async function requestPasswordChange(email: string): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) throw error;

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * verify_otp_for_password_change
 */
export async function verifyOtpForPasswordChange({
  email,
  otpToken,
}: VerifyOtpForPasswordChangeParams): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.functions.invoke("verify_otp_for_password_change", {
      body: {
        email,
        otp_token: otpToken,
      },
    });

    if (error) throw error;

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return await normalizeAsyncError(error);
  }
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string): Promise<AuthResult<{ user: User }>> {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

/**
 * Change password
 */
export async function changePassword({
  email,
  otpToken,
  newPassword,
  isCodeVerified,
}: ChangePasswordParams): Promise<AuthResult<{ isVerified: boolean }>> {
  try {
    if (!isCodeVerified) {
      const { error: verifyError } = await verifyOtpForPasswordChange({
        email,
        otpToken,
      });

      if (verifyError) throw verifyError;

      const { error } = await updatePassword(newPassword);

      return {
        data: {
          isVerified: true,
        },
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
  } catch (error) {
    return normalizeError(error);
  }
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
  try {
    const { data, error } = await supabase.auth.verifyOtp({ ...params, token: code });

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function resendSignUpOtp(email: string): Promise<AuthResult<UserAndSession>> {
  try {
    const { data, error } = await supabase.auth.resend({ email, type: "signup" });

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const { error } = await supabase.rpc("app_check_username_availability", {
      p_username: username,
    });

    if (error) throw error;

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function uploadAvatar(
  avatarBase64: string,
  avatarUrl: string
): Promise<AuthResult<null>> {
  try {
    const avatarPath = avatarUrl.replace("avatars/", "");
    const { error } = await supabase.storage
      .from("avatars")
      .upload(avatarPath, base64ToBlob(avatarBase64), {
        contentType: "image/png",
        upsert: true,
      });

    if (error)
      throw {
        code: error?.name,
        message: error?.message,
      };

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function deleteAvatar(avatarPath: string): Promise<AuthResult<null>> {
  try {
    const avatarToRemove = avatarPath.replace("avatars/", "");
    const { error: avatarRemoveError } = await supabase.storage
      .from("avatars")
      .remove([avatarToRemove]);

    if (avatarRemoveError) throw avatarRemoveError;

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function profileRegistrationUpdate(
  username: string,
  name: string,
  description: string,
  avatarName: string | null,
  socialMedias: Array<{
    type: string;
    link: string;
  } | null>
) {
  try {
    const { data, error } = await supabase.rpc("app_profile_registration_update", {
      p_username: username,
      p_name: name,
      p_bio: description || null,
      p_default_avatar_name: avatarName,
      p_social_medias: socialMedias,
    });

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

const getSocialMedias = ({ instagramUrl, youtubeUrl, tiktokUrl }: GetSocialMediasArgs) => {
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

const getAvatarName = (selectedAvatar: string) => {
  const avatarNumber = Number(selectedAvatar);
  if (!avatarNumber) return null;
  return `avatar${avatarNumber}.png`;
};

/**
 * Complete user profile after registration
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
}: ProfileSetupFormData): Promise<AuthResult<FullProfile>> {
  try {
    const { data: user, error: userError } = await getCurrentUser();
    if (userError) return { data: null, error: userError };

    const { error: usernameAvailabilityError } = await checkUsernameAvailability(username);
    if (usernameAvailabilityError) throw usernameAvailabilityError;

    const { data: avatarUrl, error } = await profileRegistrationUpdate(
      username,
      name,
      description,
      getAvatarName(selectedAvatar),
      getSocialMedias({ instagramUrl, tiktokUrl, youtubeUrl })
    );

    if (!getAvatarName(selectedAvatar) && uploadedAvatar) {
      const { error } = await uploadAvatar(uploadedAvatar, avatarUrl);
      if (error) throw error;
    }

    if (error) throw error;

    const profile = await getUserProfile();
    return profile;
  } catch (error) {
    return normalizeError(error);
  }
}

export async function getUserProfile(): Promise<AuthResult<FullProfile>> {
  try {
    const { data: session, error: sessionError } = await getSession();

    if (sessionError) throw sessionError;

    if (!session)
      return {
        data: null,
        error: null,
      };

    const { data, error } = await supabase
      .from("public_profiles_full_view")
      .select("*")
      .eq("id", session?.user?.id)
      .single();

    if (error) throw error;

    return {
      data: data && {
        ...data,
        social_medias: data.social_medias as unknown as Array<SocialMedia>,
      },
      error: null,
    };
  } catch (error) {
    return normalizeError(error);
  }
}

export async function updateProfile(
  {
    name,
    description,
    instagramUrl,
    tiktokUrl,
    youtubeUrl,
    selectedAvatar,
    uploadedAvatar,
  }: UpdateProfileFormData,
  avatarToDelete?: string
): Promise<AuthResult<FullProfile>> {
  try {
    const changeAvatar = Boolean(selectedAvatar || uploadedAvatar);
    const isUploadedAvatar = Boolean(!selectedAvatar && uploadedAvatar);

    const { data: avatarUrl, error } = await supabase.rpc("app_update_profile", {
      p_name: name,
      p_bio: description || null,
      p_social_medias: getSocialMedias({ instagramUrl, tiktokUrl, youtubeUrl }) || [],
      p_default_avatar_name: changeAvatar ? getAvatarName(selectedAvatar) : null,
      p_use_custom_avatar: changeAvatar ? isUploadedAvatar : null,
    });

    if (isUploadedAvatar) {
      const { error } = await uploadAvatar(uploadedAvatar, avatarUrl);
      if (error) throw error;
    }

    if (avatarToDelete) {
      const { error: avatarDeleteError } = await deleteAvatar(avatarToDelete);
      if (avatarDeleteError) throw avatarDeleteError;
    }

    if (error) throw error;

    const profile = await getUserProfile();
    return profile;
  } catch (error) {
    return normalizeError(error);
  }
}
