/**
 * LoginTemplate
 *
 * Presentational component for the login step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { LoginForm } from "@/components/organisms";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";

interface LoginTemplateProps {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export function LoginTemplate({ onForgotPassword, onSignUp }: LoginTemplateProps) {
  return (
    <AuthLayout title="Добро пожаловать">
      <LoginForm onForgotPassword={onForgotPassword} />
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
