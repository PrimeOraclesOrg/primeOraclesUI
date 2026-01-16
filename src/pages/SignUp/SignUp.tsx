import { ConfirmCodeTemplate, SignUpTemplate } from "@/components/templates";
import { useSignUp } from "./useSignUp";

export default function SignUp() {
  const {
    step,
    handleCloseClick,
    registerFormForm,
    onSignUpSubmit,
    navigateWithState,
    verificationCodeForm,
    userEmail,
    onConfirmSubmit,
    isResending,
    resendTimer,
    handleResendCode,
    handleHelpClick,
    onBackToSignUp,
  } = useSignUp();

  return (
    <>
      {step === "sign-up" && (
        <SignUpTemplate
          onClose={handleCloseClick}
          register={registerFormForm.register}
          onSubmit={registerFormForm.handleSubmit(onSignUpSubmit)}
          errors={registerFormForm.formState.errors}
          isSubmitting={registerFormForm.formState.isSubmitting}
          onBack={() => navigateWithState("/login")}
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
          onBack={onBackToSignUp}
          codeMode="signup"
        />
      )}
    </>
  );
}
