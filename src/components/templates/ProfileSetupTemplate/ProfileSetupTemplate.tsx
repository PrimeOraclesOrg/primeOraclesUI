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
    {/* <div className="flex items-center justify-center fixed w-full h-full left-0 top-0">
      <div className="border border-accent rounded-md p-4 max-h-[90%] max-w-[720px] w-full overflow-auto">
        <h1>Заполните профиль</h1>
        
      </div>
    </div> */}