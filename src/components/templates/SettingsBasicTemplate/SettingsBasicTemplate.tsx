import { ProfileUpdateForm } from "@/components/organisms";
import { SettingsLayout } from "../SettingsLayout/SettingsLayout";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UpdateProfileFormData } from "@/utils/validators/updateProfile";
import { SettingsTab } from "@/pages/@settings/types";

interface SettingsBasicTemplateProps {
  name: string;
  username: string;
  onLogout: () => void;
  onSubmit: () => void;
  register: UseFormRegister<UpdateProfileFormData>;
  errors: FieldErrors<UpdateProfileFormData>;
  watch: UseFormWatch<UpdateProfileFormData>;
  setValue: UseFormSetValue<UpdateProfileFormData>;
  isSubmitting: boolean;
  defaultAvatars: Array<string>;
}

export const SettingsBasicTemplate = ({
  name,
  username,
  onLogout,
  onSubmit,
  register,
  errors,
  isSubmitting,
  watch,
  defaultAvatars,
  setValue,
}: SettingsBasicTemplateProps) => {
  return (
    <SettingsLayout activeTab="basic" name={name} username={username} onLogout={onLogout}>
      <ProfileUpdateForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        defaultAvatars={defaultAvatars}
        setValue={setValue}
      />
    </SettingsLayout>
  );
};
