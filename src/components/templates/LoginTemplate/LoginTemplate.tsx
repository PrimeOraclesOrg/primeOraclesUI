/**
 * LoginTemplate
 *
 * Presentational component for the login step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
import { PasswordInput } from "@/components/molecules/PasswordInput/PasswordInput";
import { Button } from "@/components/ui/button";

interface LoginTemplateProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export function LoginTemplate({
  email,
  password,
  errors,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  onSignUp,
}: LoginTemplateProps) {
  return (
    <AuthLayout title="Добро пожаловать">
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
          placeholder="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          disabled={isLoading}
          labelRight={
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-normal"
            >
              Забыли пароль?
            </button>
          }
        />

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </form>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          ← Назад
        </button>
        <p className="text-sm text-muted-foreground">
          Нету аккаунта?{" "}
          <button
            type="button"
            onClick={onSignUp}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Регистрация
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
