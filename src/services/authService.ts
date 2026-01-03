/**
 * Auth Service
 *
 * Authentication logic for the application.
 * Prepared for Supabase Auth integration.
 */

import { supabase } from "@/utils";
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
  email: string;
  password: string;
}

export interface VerifyOtpCredentials {
  email: string;
  code: string;
  type: EmailOtpType;
}

export type UserAndSession =
  | {
      user: User;
      session: Session | null;
    }
  | {
      user: null;
      session: null;
    };

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResult<T> {
  data: T | null;
  error: AuthError | null;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(credentials: SignUpCredentials): Promise<AuthResult<UserAndSession>> {
  // TODO: Replace with Supabase auth
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
      data: credentials.metadata,
    },
  });

  console.log("signUp called with:", credentials.email);
  return {
    data,
    error,
  };
}

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials): Promise<AuthResult<UserAndSession>> {
  // TODO: Replace with Supabase auth
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
  // TODO: Replace with Supabase auth
  // const { error } = await supabase.auth.signOut();

  console.log("signOut called");
  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Get the current session
 */
export async function getSession(): Promise<AuthResult<Session>> {
  // TODO: Replace with Supabase auth
  // const { data: { session }, error } = await supabase.auth.getSession();

  return {
    data: null,
    error: null,
  };
}

/**
 * Get the current user
 */
export async function getCurrentUser(): Promise<AuthResult<User>> {
  // TODO: Replace with Supabase auth
  // const { data: { user }, error } = await supabase.auth.getUser();

  return {
    data: null,
    error: null,
  };
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult<null>> {
  // TODO: Replace with Supabase auth
  // const { error } = await supabase.auth.resetPasswordForEmail(email, {
  //   redirectTo: `${window.location.origin}/reset-password`,
  // });

  console.log("resetPassword called for:", email);
  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string): Promise<AuthResult<User>> {
  // TODO: Replace with Supabase auth
  // const { data, error } = await supabase.auth.updateUser({
  //   password: newPassword,
  // });

  console.log("updatePassword called");
  return {
    data: null,
    error: { message: "Not implemented - requires Supabase integration" },
  };
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
): () => void {
  // TODO: Replace with Supabase auth
  // const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  // return () => subscription.unsubscribe();

  console.log("onAuthStateChange subscription created");
  return () => {
    console.log("onAuthStateChange subscription removed");
  };
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
