/**
 * Auth Page
 *
 * Unified authentication page with single-page flow.
 * Handles: login, register, forgot password, confirm code, reset password
 * All steps are managed within this single page without routing.
 */

import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { LoginTemplate } from "@/components/templates/LoginTemplate/LoginTemplate";
import { ForgotPasswordTemplate } from "@/components/templates/ForgotPasswordTemplate/ForgotPasswordTemplate";
import { ConfirmCodeTemplate } from "@/components/templates/ConfirmCodeTemplate/ConfirmCodeTemplate";
import { ResetPasswordTemplate } from "@/components/templates/ResetPasswordTemplate/ResetPasswordTemplate";
import { SignUpTemplate } from "@/components/templates";

type AuthStep = "login" | "register" | "forgot-password" | "confirm-code" | "reset-password";

export default function Auth() {
  const location = useLocation();

  // Determine initial step from route
  const getInitialStep = (): AuthStep => {
    const path = location.pathname;
    if (path === "/register") return "register";
    if (path === "/forgot-password") return "forgot-password";
    if (path === "/confirm-code") return "confirm-code";
    if (path === "/reset-password") return "reset-password";
    return "login";
  };

  const [step, setStep] = useState<AuthStep>(getInitialStep);
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

  return (
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
