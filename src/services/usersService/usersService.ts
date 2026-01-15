/**
 * Users Service
 *
 * User profile and data management.
 * Prepared for Supabase integration.
 */

import type { UserProfile } from "@/types";
import { mockSocialLinks } from "@/data/transactions";
import { ServiceResult, UserProfileUpdate } from "./types";

/**
 * Get user profile by user ID
 */
export async function fetchUserProfile(userId: string): Promise<ServiceResult<UserProfile>> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .eq('id', userId)
  //   .single();

  // Return mock data for now
  return {
    data: {
      name: "Lesha Maisak",
      username: "Leshamais",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      description: "",
      socialLinks: mockSocialLinks,
    },
    error: null,
  };
}

/**
 * Get current user's profile
 */
export async function fetchCurrentUserProfile(): Promise<ServiceResult<UserProfile>> {
  // TODO: Replace with Supabase query using auth user
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) return { data: null, error: { message: "Not authenticated" } };
  // return fetchUserProfile(user.id);

  return fetchUserProfile("current");
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: UserProfileUpdate
): Promise<ServiceResult<UserProfile>> {
  // TODO: Replace with Supabase update
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .update(updates)
  //   .eq('id', userId)
  //   .select()
  //   .single();

  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Update current user's profile
 */
export async function updateCurrentUserProfile(
  updates: UserProfileUpdate
): Promise<ServiceResult<UserProfile>> {
  // TODO: Replace with Supabase query using auth user
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) return { data: null, error: { message: "Not authenticated" } };
  // return updateUserProfile(user.id, updates);

  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Upload user avatar
 */
export async function uploadAvatar(userId: string, file: File): Promise<ServiceResult<string>> {
  // TODO: Replace with Supabase storage
  // const fileName = `${userId}/${Date.now()}-${file.name}`;
  // const { data, error } = await supabase.storage
  //   .from('avatars')
  //   .upload(fileName, file);
  // if (error) return { data: null, error };
  // const { data: { publicUrl } } = supabase.storage
  //   .from('avatars')
  //   .getPublicUrl(fileName);
  // return { data: publicUrl, error: null };

  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Delete user account
 */
export async function deleteUserAccount(userId: string): Promise<ServiceResult<null>> {
  // TODO: Replace with Supabase RPC for secure deletion
  // const { error } = await supabase.rpc('delete_user_account', { user_id: userId });

  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailability(username: string): Promise<ServiceResult<boolean>> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .select('username')
  //   .eq('username', username)
  //   .maybeSingle();
  // return { data: !data, error };

  return {
    data: true,
    error: null,
  };
}
