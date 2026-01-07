/**
 * Auth Page
 *
 * Unified authentication page with single-page flow.
 * Handles: login, register, forgot password, confirm code, reset password
 * All steps are managed within this single page without routing.
 */

import { useState, useCallback } from "react";
import { LoginTemplate } from "@/components/templates/LoginTemplate/LoginTemplate";
import { ForgotPasswordTemplate } from "@/components/templates/ForgotPasswordTemplate/ForgotPasswordTemplate";
import { ConfirmCodeTemplate } from "@/components/templates/ConfirmCodeTemplate/ConfirmCodeTemplate";
import { ResetPasswordTemplate } from "@/components/templates/ResetPasswordTemplate/ResetPasswordTemplate";
import { SignUpTemplate } from "@/components/templates";
import { useAuthModal } from "@/hooks/useAuthModal";

type AuthStep = "login" | "register" | "forgot-password" | "confirm-code" | "reset-password";

export const AuthModal = () => {
  const { isOpen } = useAuthModal();
  const [step, setStep] = useState<AuthStep>("login");
  const [codeMode, setCodeMode] = useState<"signup" | "recovery">("signup");
  const [email, setEmail] = useState("");

  const goToStep = useCallback((newStep: AuthStep) => {
    setStep(newStep);
  }, []);

  const goToConfirmCode = (codeMode: "signup" | "recovery", email: string) => {
    setCodeMode(codeMode);
    setEmail(email);
    goToStep("confirm-code");
  };

  if (isOpen) return (
    <>
      {step === "login" && (
        <LoginTemplate
          onForgotPassword={() => goToStep("forgot-password")}
          onSignUp={() => goToStep("register")}
        />
      )}

      {step === "register" && (
        <SignUpTemplate
          onBack={() => goToStep("login")}
          goToConfirmCode={(email: string) => goToConfirmCode("signup", email)}
        />
      )}

      {step === "forgot-password" && (
        <ForgotPasswordTemplate
          onBack={() => goToStep("login")}
          goToConfirmCode={(email: string) => goToConfirmCode("recovery", email)}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          email={email}
          goToResetPassword={() => goToStep("reset-password")}
          mode={codeMode}
          onBack={() =>
            codeMode === "signup" ? goToStep("register") : goToStep("forgot-password")
          }
        />
      )}

      {step === "reset-password" && <ResetPasswordTemplate goToLogin={() => goToStep("login")} />}
    </>
  );
}
