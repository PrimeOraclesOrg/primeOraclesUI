/**
 * ResetPasswordTemplate
 *
 * Presentational component for the reset password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm/ResetPasswordForm";

interface ResetPasswordTemplateProps {
  goToLogin: () => void;
}

export function ResetPasswordTemplate({ goToLogin }: ResetPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Новый пароль"
      subtitle="Введите новый пароль для вашего аккаунта"
      showBackButton
      onBack={goToLogin}
    >
      <ResetPasswordForm goToLogin={goToLogin} />
    </AuthLayout>
  );
}
