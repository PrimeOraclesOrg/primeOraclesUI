/**
 * RegisterTemplate
 *
 * Presentational component for the registration step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
import { PasswordInput } from "@/components/molecules/PasswordInput/PasswordInput";
import { Button } from "@/components/ui/button";

interface RegisterTemplateProps {
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function RegisterTemplate({
  email,
  password,
  confirmPassword,
  errors,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: RegisterTemplateProps) {
  return (
    <AuthLayout
      title="Создать аккаунт"
      showBackButton
      onBack={onBack}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />

        <PasswordInput
          label="Password"
          placeholder="Введите пароль"
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
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center mt-8 pt-4">
        <p className="text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Войти
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
