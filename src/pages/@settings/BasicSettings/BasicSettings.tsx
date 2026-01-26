import { SettingsBasicTemplate } from "@/components/templates";
import { useBasicSettings } from "./useBasicSettings";
import { DEFAULT_AVATARS } from "@/data";
import { useSettings } from "../useSettings";

export const BasicSettings = () => {
  const { updateProfileForm, onUpdateProfileSubmit } = useBasicSettings();
  const { onLogout, profile } = useSettings();

  return (
    <SettingsBasicTemplate
      name={profile?.name}
      username={profile?.username}
      onLogout={onLogout}
      register={updateProfileForm.register}
      onSubmit={updateProfileForm.handleSubmit(onUpdateProfileSubmit)}
      isSubmitting={updateProfileForm.formState.isSubmitting}
      errors={updateProfileForm.formState.errors}
      defaultAvatars={DEFAULT_AVATARS}
      watch={updateProfileForm.watch}
      setValue={updateProfileForm.setValue}
    />
  );
};
