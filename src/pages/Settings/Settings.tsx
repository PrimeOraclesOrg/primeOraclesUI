import {
  SettingsBalanceTemplate,
  SettingsBasicTemplate,
  SettingsHistoryTemplate,
  SettingsSecurityTemplate,
} from "@/components/templates";
import { mockTransactions, mockOrders } from "@/data/transactions";
import { useSettings } from "./useSettings";
import NotFound from "../NotFound";
import { DEFAULT_AVATARS } from "@/data";
import { PasswordUpdatePopup } from "@/components/organisms";

export default function Settings() {
  const {
    tab,
    user,
    profile,
    onLogout,
    onTabChange,
    onUpdateProfileSubmit,
    isChangePasswordDialogOpen,
    setIsChangePasswordDialogOpen,
    updateProfileForm,
    handlePasswordChangeClick,
    updatePasswordForm,
    onUpdatePasswordSubmit,
  } = useSettings();

  if (tab && !["basic", "security", "balance", "history"].includes(tab)) return <NotFound />;

  return (
    <>
      {(tab === "basic" || !tab) && (
        <SettingsBasicTemplate
          name={profile?.name}
          username={profile?.username}
          onTabChange={onTabChange}
          onLogout={onLogout}
          register={updateProfileForm.register}
          onSubmit={updateProfileForm.handleSubmit(onUpdateProfileSubmit)}
          isSubmitting={updateProfileForm.formState.isSubmitting}
          errors={updateProfileForm.formState.errors}
          defaultAvatars={DEFAULT_AVATARS}
          watch={updateProfileForm.watch}
          setValue={updateProfileForm.setValue}
        />
      )}
      {tab === "security" && (
        <>
          <SettingsSecurityTemplate
            name={profile?.name}
            username={profile?.username}
            onTabChange={onTabChange}
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
            email={user.email}
            isResending={false}
            onResendCode={() => {}}
            resendTimer={60}
          />
        </>
      )}
      {tab === "balance" && (
        <SettingsBalanceTemplate
          balance={0}
          name={profile?.name}
          username={profile?.username}
          transactions={mockTransactions}
          onTabChange={onTabChange}
          onLogout={onLogout}
        />
      )}
      {tab === "history" && (
        <SettingsHistoryTemplate
          name={profile?.name}
          username={profile?.name}
          orders={mockOrders}
          onLogout={onLogout}
          onTabChange={onTabChange}
        />
      )}
    </>
  );
}
