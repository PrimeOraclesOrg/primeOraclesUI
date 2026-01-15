/**
 * Auth Service
 *
 * Authentication logic for the application.
 * Prepared for Supabase Auth integration.
 */

import { supabase } from "@/utils";
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
}

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials): Promise<AuthResult<UserAndSession>> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  return {
    data,
    error,
  };
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult<null>> {
  const { error } = await supabase.auth.signOut();

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
  } = await supabase.auth.getSession();

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
  } = await supabase.auth.getUser();

  return {
    data: user,
    error,
  };
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult<null>> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  return {
    data: null,
    error,
  };
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string): Promise<AuthResult<{ user: User }>> {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

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
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return () => subscription.unsubscribe();
}

export async function verifyOtp({
  code,
  ...params
}: VerifyOtpCredentials): Promise<AuthResult<UserAndSession>> {
  const { data, error } = await supabase.auth.verifyOtp({ ...params, token: code });

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

/**
 * Profile data for completing user profile
 */
export interface ProfileData {
  name: string;
  username: string;
  description?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  avatar?: string;
}

/**
 * Complete user profile after registration (mock implementation)
 */
export async function completeProfile(data: ProfileData): Promise<AuthResult<null>> {
  console.log("completeProfile called with:", data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success response
  return {
    data: null,
    error: null,
  };
}
