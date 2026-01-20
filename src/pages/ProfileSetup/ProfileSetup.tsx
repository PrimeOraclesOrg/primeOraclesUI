import { ProfileSetupTemplate } from "@/components/templates";
import { useProfileSetup } from "./useProfileSetup";
import { DEFAULT_AVATARS } from "@/data";

export default function ProfileSetup() {
  const { onProfileSetupSubmit, profileSetupForm } = useProfileSetup();

  return (
    <ProfileSetupTemplate
      register={profileSetupForm.register}
      onSubmit={profileSetupForm.handleSubmit(onProfileSetupSubmit)}
      errors={profileSetupForm.formState.errors}
      isSubmitting={profileSetupForm.formState.isSubmitting}
      setValue={profileSetupForm.setValue}
      watch={profileSetupForm.watch}
      prepairedAvatars={DEFAULT_AVATARS}
    />
  );
}
