import { ProfileUpdateForm } from "@/components/organisms";
import { SettingsLayout } from "../SettingsLayout/SettingsLayout";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateProfileFormData } from "@/utils/validators/updateProfile";
import { SettingsTab } from "@/pages/Settings/types";

interface SettingsBasicTemplateProps {
  name: string;
  username: string;
  onLogout: () => void;
  onTabChange: (tab: SettingsTab) => void;
  onSubmit: () => void;
  register: UseFormRegister<UpdateProfileFormData>;
  errors: FieldErrors<UpdateProfileFormData>;
  isSubmitting: boolean;
}

export const SettingsBasicTemplate = ({
  name,
  username,
  onLogout,
  onTabChange,
  onSubmit,
  register,
  errors,
  isSubmitting,
}: SettingsBasicTemplateProps) => {
  return (
    <SettingsLayout
      activeTab="basic"
      name={name}
      username={username}
      onLogout={onLogout}
      onTabChange={onTabChange}
    >
      <ProfileUpdateForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </SettingsLayout>
  );
};
