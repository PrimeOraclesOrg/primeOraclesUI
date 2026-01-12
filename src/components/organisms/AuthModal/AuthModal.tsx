/**
 * Auth Page
 *
 * Unified authentication page with single-page flow.
 * Handles: login, register, forgot password, confirm code, reset password, profile setup
 * All steps are managed within this single page without routing.
 */

import { LoginTemplate } from "@/components/templates/LoginTemplate/LoginTemplate";
import { ForgotPasswordTemplate } from "@/components/templates/ForgotPasswordTemplate/ForgotPasswordTemplate";
import { ConfirmCodeTemplate } from "@/components/templates/ConfirmCodeTemplate/ConfirmCodeTemplate";
import { ResetPasswordTemplate } from "@/components/templates/ResetPasswordTemplate/ResetPasswordTemplate";
import { ProfileSetupTemplate } from "@/components/templates/ProfileSetupTemplate/ProfileSetupTemplate";
import { SignUpTemplate } from "@/components/templates";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCurrentUser } from "@/services";

export const AuthModal = () => {
  const { isOpen, view, close } = useAuthModal();
  const { isAuthenticated, setAuthentication, setEmail } = useAuth();

  useEffect(() => {
    (async () => {
      const { data, error } = await getCurrentUser();
      if (!error && data) {
          setAuthentication(true);
          setEmail(data.email);
      }
    })();
;  }, [setEmail, setAuthentication])

  useEffect(() => {
    if (["login", "register", "forgot-password"].includes(view) && isAuthenticated) close();
  }, [view, close, isAuthenticated]);

  if (isOpen)
    return (
      <>
        {view === "login" && <LoginTemplate />}

        {view === "register" && <SignUpTemplate />}

        {view === "forgot-password" && <ForgotPasswordTemplate />}

        {view === "confirm-code" && <ConfirmCodeTemplate />}

        {view === "reset-password" && <ResetPasswordTemplate />}

        {view === "profile-setup" && <ProfileSetupTemplate />}
      </>
    );
};
