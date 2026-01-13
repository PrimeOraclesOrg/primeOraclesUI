/**
 * ResetPasswordTemplate
 *
 * Presentational component for the reset password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm/ResetPasswordForm";
import { FormEvent } from "react";

interface ResetPasswordTemplateProps {
  onBack: () => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  errors: { password?: string; confirmPassword?: string };
  isLoading: boolean;
  onChangePassword: (event: FormEvent) => void;
}

export function ResetPasswordTemplate({ onBack, ...props }: ResetPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Новый пароль"
      subtitle="Введите новый пароль для вашего аккаунта"
      showBackButton
      onBack={onBack}
    >
      <ResetPasswordForm {...props} />
    </AuthLayout>
  );
}
