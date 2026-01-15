import { ConfirmCodeTemplate, ProfileSetupTemplate, SignUpTemplate } from "@/components/templates";
import { useSignUp } from "./useSignUp";

export default function SignUp() {
  const {
    step,
    handleCloseClick,
    signUpForm,
    onSignUpSubmit,
    navigateWithState,
    confirmForm,
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
          register={signUpForm.register}
          onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
          errors={signUpForm.formState.errors}
          isSubmitting={signUpForm.formState.isSubmitting}
          onBack={() => navigateWithState("/login")}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          onClose={handleCloseClick}
          onReset={() => confirmForm.reset()}
          email={userEmail}
          control={confirmForm.control}
          onSubmit={confirmForm.handleSubmit(onConfirmSubmit)}
          errors={confirmForm.formState.errors}
          isSubmitting={confirmForm.formState.isSubmitting}
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
