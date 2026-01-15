import {
  ConfirmCodeTemplate,
  ForgotPasswordTemplate,
  ResetPasswordTemplate,
} from "@/components/templates";
import { useResetPassword } from "./useResetPassword";

export default function ResetPassword() {
  const {
    step,
    userEmail,
    resendTimer,
    isResending,
    emailForm,
    confirmForm,
    passwordForm,
    handlers,
  } = useResetPassword();

  return (
    <>
      {step === "email-input" && (
        <ForgotPasswordTemplate
          onClose={handlers.handleCloseClick}
          register={emailForm.register}
          onSubmit={emailForm.handleSubmit(handlers.onEmailSubmit)}
          errors={emailForm.formState.errors}
          isSubmitting={emailForm.formState.isSubmitting}
          onBack={handlers.navigateToLogin}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          onClose={handlers.handleCloseClick}
          onReset={() => confirmForm.reset()}
          email={userEmail}
          control={confirmForm.control}
          onSubmit={confirmForm.handleSubmit(handlers.onConfirmSubmit)}
          errors={confirmForm.formState.errors}
          isSubmitting={confirmForm.formState.isSubmitting}
          isResending={isResending}
          resendTimer={resendTimer}
          onResendCode={handlers.handleResendCode}
          onHelpClick={handlers.handleHelpClick}
          onBack={handlers.goToEmailInput}
          codeMode="recovery"
        />
      )}

      {step === "password-change" && (
        <ResetPasswordTemplate
          onClose={handlers.handleCloseClick}
          register={passwordForm.register}
          onSubmit={passwordForm.handleSubmit(handlers.onPasswordSubmit)}
          errors={passwordForm.formState.errors}
          isSubmitting={passwordForm.formState.isSubmitting}
          onBack={handlers.goToEmailInput}
        />
      )}
    </>
  );
}