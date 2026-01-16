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
    forgotPasswordForm,
    verificationCodeForm,
    resetPasswordForm,
    handlers,
  } = useResetPassword();

  return (
    <>
      {step === "email-input" && (
        <ForgotPasswordTemplate
          onClose={handlers.handleCloseClick}
          register={forgotPasswordForm.register}
          onSubmit={forgotPasswordForm.handleSubmit(handlers.onEmailSubmit)}
          errors={forgotPasswordForm.formState.errors}
          isSubmitting={forgotPasswordForm.formState.isSubmitting}
          onBack={handlers.navigateToLogin}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          onClose={handlers.handleCloseClick}
          onReset={() => verificationCodeForm.reset()}
          email={userEmail}
          control={verificationCodeForm.control}
          onSubmit={verificationCodeForm.handleSubmit(handlers.onConfirmSubmit)}
          errors={verificationCodeForm.formState.errors}
          isSubmitting={verificationCodeForm.formState.isSubmitting}
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
          register={resetPasswordForm.register}
          onSubmit={resetPasswordForm.handleSubmit(handlers.onPasswordSubmit)}
          errors={resetPasswordForm.formState.errors}
          isSubmitting={resetPasswordForm.formState.isSubmitting}
          onBack={handlers.goToEmailInput}
        />
      )}
    </>
  );
}
