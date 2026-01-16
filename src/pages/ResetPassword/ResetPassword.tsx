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
    goToEmailInput,
    handleCloseClick,
    handleHelpClick,
    handleResendCode,
    navigateToLogin,
    onConfirmSubmit,
    onEmailSubmit,
    onPasswordSubmit,
  } = useResetPassword();

  return (
    <>
      {step === "email-input" && (
        <ForgotPasswordTemplate
          onClose={handleCloseClick}
          register={forgotPasswordForm.register}
          onSubmit={forgotPasswordForm.handleSubmit(onEmailSubmit)}
          errors={forgotPasswordForm.formState.errors}
          isSubmitting={forgotPasswordForm.formState.isSubmitting}
          onBack={navigateToLogin}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          onClose={handleCloseClick}
          onReset={() => verificationCodeForm.reset()}
          email={userEmail}
          control={verificationCodeForm.control}
          onSubmit={verificationCodeForm.handleSubmit(onConfirmSubmit)}
          errors={verificationCodeForm.formState.errors}
          isSubmitting={verificationCodeForm.formState.isSubmitting}
          isResending={isResending}
          resendTimer={resendTimer}
          onResendCode={handleResendCode}
          onHelpClick={handleHelpClick}
          onBack={goToEmailInput}
          codeMode="recovery"
        />
      )}

      {step === "password-change" && (
        <ResetPasswordTemplate
          onClose={handleCloseClick}
          register={resetPasswordForm.register}
          onSubmit={resetPasswordForm.handleSubmit(onPasswordSubmit)}
          errors={resetPasswordForm.formState.errors}
          isSubmitting={resetPasswordForm.formState.isSubmitting}
          onBack={goToEmailInput}
        />
      )}
    </>
  );
}
