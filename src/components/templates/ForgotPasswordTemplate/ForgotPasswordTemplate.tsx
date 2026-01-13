/**
 * ForgotPasswordTemplate
 *
 * Presentational component for the forgot password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ForgotPasswordForm } from "@/components/organisms";
import { FormEvent } from "react";

interface ForgotPasswordTemplateProps {
  onForgotPassword: (event: FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  error: string;
  isLoading: boolean;
  onBack: () => void;
}

export function ForgotPasswordTemplate({ onBack, ...props }: ForgotPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Восстановление пароля"
      subtitle="Введите э-почту, и мы отправим вам код для восстановления"
      showBackButton
      onBack={onBack}
    >
      <ForgotPasswordForm {...props} />

      {/* Footer */}
      <div className="text-center mt-8 pt-4">
        <p className="text-sm text-muted-foreground">
          Вспомнили пароль?{" "}
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
