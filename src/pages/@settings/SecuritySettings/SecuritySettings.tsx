import { PasswordUpdatePopup } from "@/components/organisms";
import { SettingsSecurityTemplate } from "@/components/templates";
import { useSecuritySettings } from "./useSecuritySettings";
import { useSettings } from "../useSettings";

export const SecuritySettings = () => {
  const {
    setIsChangePasswordDialogOpen,
    isChangePasswordDialogOpen,
    onUpdatePasswordSubmit,
    updatePasswordForm,
    handlePasswordChangeClick,
  } = useSecuritySettings();
  const { onLogout, profile } = useSettings();

  return (
    <>
      <SettingsSecurityTemplate
        name={profile?.name}
        username={profile?.username}
        onLogout={onLogout}
        onPasswordChangeClick={handlePasswordChangeClick}
      />

      <PasswordUpdatePopup
        isChangePasswordDialogOpen={isChangePasswordDialogOpen}
        setIsChangePasswordDialogOpen={setIsChangePasswordDialogOpen}
        errors={updatePasswordForm.formState.errors}
        control={updatePasswordForm.control}
        register={updatePasswordForm.register}
        isSubmitting={updatePasswordForm.formState.isSubmitting}
        resetField={updatePasswordForm.resetField}
        onSubmit={updatePasswordForm.handleSubmit(onUpdatePasswordSubmit)}
        isResending={false}
        onResendCode={() => {}}
        resendTimer={60}
      />
    </>
  );
};
