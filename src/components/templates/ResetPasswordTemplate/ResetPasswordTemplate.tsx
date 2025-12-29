/**
 * ResetPasswordTemplate
 *
 * Presentational component for the reset password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { PasswordInput } from "@/components/molecules/PasswordInput/PasswordInput";
import { Button } from "@/components/ui/button";

interface ResetPasswordTemplateProps {
  password: string;
  confirmPassword: string;
  errors: {
    password?: string;
    confirmPassword?: string;
  };
  isLoading: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function ResetPasswordTemplate({
  password,
  confirmPassword,
  errors,
  isLoading,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: ResetPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Новый пароль"
      subtitle="Введите новый пароль для вашего аккаунта"
      showBackButton
      onBack={onBack}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <PasswordInput
          label="New Password"
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Сохранение..." : "Подтвердить"}
        </Button>
      </form>
    </AuthLayout>
  );
}
