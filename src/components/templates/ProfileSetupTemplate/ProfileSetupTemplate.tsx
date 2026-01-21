/**
 * ProfileSetupTemplate Component
 *
 * Template for the profile setup step in the authentication flow.
 * Displayed after successful email verification.
 */

import { ProfileSetupForm } from "@/components/organisms/ProfileSetupForm/ProfileSetupForm";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProfileSetupFormData } from "@/utils";

interface ProfileSetupTemplateProps {
  onSubmit: () => void;
  register: UseFormRegister<ProfileSetupFormData>;
  errors: FieldErrors<ProfileSetupFormData>;
  isSubmitting: boolean;
  watch: UseFormWatch<ProfileSetupFormData>;
  setValue: UseFormSetValue<ProfileSetupFormData>;
  defaultAvatars: Array<string>;
  onLogout: () => void;
}

export const ProfileSetupTemplate = ({
  errors,
  onSubmit,
  register,
  isSubmitting,
  setValue,
  watch,
  defaultAvatars,
  onLogout,
}: ProfileSetupTemplateProps) => {
  return (
    <AuthLayout title="Заполните профиль" onLogout={onLogout}>
      <ProfileSetupForm
        errors={errors}
        onSubmit={onSubmit}
        register={register}
        isSubmitting={isSubmitting}
        setValue={setValue}
        watch={watch}
        defaultAvatars={defaultAvatars}
      />
    </AuthLayout>
  );
};
