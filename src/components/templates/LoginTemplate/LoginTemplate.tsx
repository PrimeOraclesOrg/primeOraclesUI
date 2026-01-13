/**
 * LoginTemplate
 *
 * Presentational component for the login step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { LoginForm } from "@/components/organisms";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { LoginErrors } from "@/pages/Login";
import { FormEvent } from "react";

interface LoginTemplateProps {
  onLogin: (event: FormEvent<Element>) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  errors: LoginErrors;
  toForgotPassword: () => void;
  isLoading: boolean;
  toSignUp: () => void;
  onClose?: () => void;
}

export function LoginTemplate({ toSignUp, onClose, ...props }: LoginTemplateProps) {
  return (
    <AuthLayout title="Добро пожаловать" onClose={onClose}>
      <LoginForm {...props} />
      <div className="flex items-center justify-center mt-8 pt-4">
        <p className="text-sm text-muted-foreground">
          Нету аккаунта?{" "}
          <button
            type="button"
            onClick={toSignUp}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Регистрация
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
