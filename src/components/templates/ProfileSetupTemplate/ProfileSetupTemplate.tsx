/**
 * ProfileSetupTemplate Component
 *
 * Template for the profile setup step in the authentication flow.
 * Displayed after successful email verification.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ProfileSetupForm } from "@/components/organisms/ProfileSetupForm/ProfileSetupForm";

export const ProfileSetupTemplate = () => {
  return (
    <AuthLayout title="Заполните профиль">
      <ProfileSetupForm />
    </AuthLayout>
  );
};
