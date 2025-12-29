/**
 * ResetPasswordTemplate
 * 
 * Presentational component for the reset password page.
 */

import { Logo } from "@/components/atoms/Logo/Logo";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
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
}

export function ResetPasswordTemplate({
  password,
  confirmPassword,
  errors,
  isLoading,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: ResetPasswordTemplateProps) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center space-y-6">
        <Logo size="lg" />

        <h1 className="text-2xl font-semibold text-foreground text-center">
          Введите новый пароль
        </h1>

        <form onSubmit={onSubmit} className="w-full space-y-4">
          <AuthInput
            label="Новый пароль"
            type="password"
            placeholder="Введите новый пароль"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            error={errors.password}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <AuthInput
            label="Повторите новый пароль"
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium gold-gradient hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Сохранение..." : "Подтвердить"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
