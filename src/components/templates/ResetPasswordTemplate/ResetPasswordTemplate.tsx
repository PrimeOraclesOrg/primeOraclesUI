/**
 * ResetPasswordTemplate
 *
 * Presentational component for the reset password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm/ResetPasswordForm";
import { useAuthModal } from "@/hooks/useAuthModal";

export function ResetPasswordTemplate() {
  const { setView } = useAuthModal();

  return (
    <AuthLayout
      title="Новый пароль"
      subtitle="Введите новый пароль для вашего аккаунта"
      showBackButton
      onBack={() => setView("login")}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
