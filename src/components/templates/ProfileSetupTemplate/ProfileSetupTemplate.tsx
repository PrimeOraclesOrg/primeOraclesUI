/**
 * ProfileSetupTemplate Component
 *
 * Template for the profile setup step in the authentication flow.
 * Displayed after successful email verification.
 */

import { ProfileSetupForm } from "@/components/organisms/ProfileSetupForm/ProfileSetupForm";
import { AuthLayout } from "../AuthLayout/AuthLayout";

export const ProfileSetupTemplate = () => {
  return (
    <AuthLayout title="Заполните профиль">
      <ProfileSetupForm />
    </AuthLayout>
  );
};