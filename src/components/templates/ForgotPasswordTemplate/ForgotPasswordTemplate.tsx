/**
 * ForgotPasswordTemplate
 * 
 * Presentational component for the forgot password page.
 */

import { Link } from "react-router-dom";
import { Logo } from "@/components/atoms/Logo/Logo";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
import { Button } from "@/components/ui/button";

interface ForgotPasswordTemplateProps {
  email: string;
  error?: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ForgotPasswordTemplate({
  email,
  error,
  isLoading,
  onEmailChange,
  onSubmit,
}: ForgotPasswordTemplateProps) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center space-y-6">
        <Logo size="lg" />

        <h1 className="text-2xl font-semibold text-foreground text-center">
          Восстановление пароля
        </h1>

        <form onSubmit={onSubmit} className="w-full space-y-4">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            error={error}
            autoComplete="email"
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium gold-gradient hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Отправка..." : "Восстановить пароль"}
          </Button>
        </form>

        <p className="text-muted-foreground">
          Вспомнили пароль?{" "}
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
