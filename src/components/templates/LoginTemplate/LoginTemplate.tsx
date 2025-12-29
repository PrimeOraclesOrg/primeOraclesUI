/**
 * LoginTemplate
 * 
 * Presentational component for the login page.
 */

import { Link } from "react-router-dom";
import { Logo } from "@/components/atoms/Logo/Logo";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
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
}

export function LoginTemplate({
  email,
  password,
  errors,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginTemplateProps) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center space-y-6">
        <Logo size="lg" />
        
        <h1 className="text-2xl font-semibold text-foreground">
          Присоединиться
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

          <div className="space-y-1">
            <AuthInput
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Забыли пароль?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium gold-gradient hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Продолжить"}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Нету аккаунта?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Зарегистрироваться
            </Link>
          </p>
          <p className="text-xs text-muted-foreground px-4">
            Регистрируясь, вы соглашаетесь с Условиями обслуживания и Политикой
            конфиденциальности Prime Oracles.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
