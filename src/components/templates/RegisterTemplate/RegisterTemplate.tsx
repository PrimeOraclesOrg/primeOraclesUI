/**
 * RegisterTemplate
 * 
 * Presentational component for the registration page.
 */

import { Link } from "react-router-dom";
import { Logo } from "@/components/atoms/Logo/Logo";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
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
}: RegisterTemplateProps) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center space-y-6">
        <Logo size="lg" />

        <h1 className="text-2xl font-semibold text-foreground">
          Регистрация
        </h1>

        <form onSubmit={onSubmit} className="w-full space-y-4">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            error={errors.email}
            autoComplete="email"
            disabled={isLoading}
          />

          <AuthInput
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            error={errors.password}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <AuthInput
            label="Подтвердите пароль"
            type="password"
            placeholder="Введите пароль ещё раз"
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
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>

        <p className="text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Войти
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
