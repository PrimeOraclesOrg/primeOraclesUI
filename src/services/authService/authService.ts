/**
 * Auth Service
 *
 * Authentication logic for the application.
 * Prepared for Supabase Auth integration.
 */

import { base64ToBlob, ProfileSetupFormData, supabase } from "@/utils";
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

    return {
      data,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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

    return {
      data,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.auth.signOut();

    return {
      data: null,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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

    return {
      data: session,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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

    return {
      data: user,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    return {
      data: null,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

/**
 * Send password change email
 */
export async function requestPasswordChange(email: string): Promise<AuthResult<null>> {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });

    return {
      data: null,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

/**
 * verify_otp_for_password_change
 */
export async function verifyOtpForPasswordChange({
  email,
  otpToken,
  flow,
}: VerifyOtpForPasswordChangeParams): Promise<AuthResult<null>> {
  try {
    const { response, data, error } = await supabase.functions.invoke(
      "verify_otp_for_password_change",
      {
        body: {
          email,
          otp_token: otpToken,
          flow,
        },
      }
    );

    const errorCode = (await error?.context?.json())?.error || null;

    return {
      data: null,
      error: error && {
        code: errorCode,
        message: errorCode,
      },
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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

    return {
      data,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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
        flow: "change_password",
      });

      if (verifyError) {
        return {
          data: {
            isVerified: false,
          },
          error: verifyError,
        };
      }
    }
    const { error } = await updatePassword(newPassword);

    return {
      data: {
        isVerified: true,
      },
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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

    return {
      data,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

export async function resendSignUpOtp(email: string): Promise<AuthResult<UserAndSession>> {
  try {
    const { data, error } = await supabase.auth.resend({ email, type: "signup" });

    return {
      data,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
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
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

export async function uploadAvatar(avatarBase64: string, userId: string) {
  try {
    const { error } = await supabase.storage
      .from("avatars")
      .upload(userId, base64ToBlob(avatarBase64), {
        contentType: "image/png",
        upsert: true,
      });

    if (error)
      return {
        data: null,
        error: {
          code: error?.name,
          message: error?.message,
        },
      };
    return {
      data: null,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
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
}: ProfileSetupFormData): Promise<AuthResult<null>> {
  const { data: user, error: userError } = await getCurrentUser();
  if (userError) return { data: null, error: userError };

  const usernameAvailability = await checkUsernameAvailability(username);
  if (usernameAvailability?.error) return usernameAvailability;

  if (!getAvatarName(selectedAvatar) && uploadedAvatar) {
    const avatarUploading = await uploadAvatar(uploadedAvatar, user.id);
    if (avatarUploading.error) return avatarUploading;
  }

  const { error } = await profileRegistrationUpdate(
    username,
    name,
    description,
    getAvatarName(selectedAvatar),
    getSocialMedias({ instagramUrl, tiktokUrl, youtubeUrl })
  );

  if (error)
    return {
      data: null,
      error,
    };

  const profile = await getUserProfile();
  return profile;
}

export async function getUserProfile() {
  try {
    const { data: session, error: userError } = await getSession();

    if (userError) {
      return {
        data: null,
        error: userError,
      };
    }

    const { data, error } = await supabase
      .from("public_profiles_full_view")
      .select("*")
      .eq("id", session?.user?.id)
      .single();
    return {
      data,
      error,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}

export async function updateProfile({
  name,
  description,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
  selectedAvatar,
  uploadedAvatar,
}: UpdateProfileFormData): Promise<AuthResult<null>> {
  try {
    const { data: session, error: sessionError } = await getSession();

    if (sessionError)
      return {
        data: null,
        error: sessionError,
      };

    const changeAvatar = Boolean(selectedAvatar || uploadedAvatar);
    const isUploadedAvatar = Boolean(!selectedAvatar && uploadedAvatar);

    if (isUploadedAvatar) {
      const { error } = await uploadAvatar(uploadedAvatar, session.user.id);
      if (error)
        return {
          data: null,
          error,
        };
    }

    const { error } = await supabase.rpc("app_update_profile", {
      p_name: name,
      p_bio: description || null,
      p_social_medias: getSocialMedias({ instagramUrl, tiktokUrl, youtubeUrl }) || [],
      p_default_avatar_name: changeAvatar ? getAvatarName(selectedAvatar) : null,
      p_use_custom_avatar: changeAvatar ? isUploadedAvatar : null,
    });

    if (error)
      return {
        data: null,
        error: error && {
          code: error?.hint || error?.code,
          message: error?.message,
        },
      };

    const profile = await getUserProfile();
    return profile;
  } catch {
    return {
      data: null,
      error: {
        code: "unexpected_error",
        message: "Unexpected error",
      },
    };
  }
}
