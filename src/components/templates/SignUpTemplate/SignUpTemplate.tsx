/**
 * RegisterTemplate
 *
 * Presentational component for the registration step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { SignUpForm } from "@/components/organisms";
import { FormEvent } from "react";

interface SignUpTemplateProps {
  onBack: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  isLoading: boolean;
  onSignUp: (event: FormEvent) => void;
}

export function SignUpTemplate({ onBack, ...props }: SignUpTemplateProps) {
  return (
    <AuthLayout title="Создать аккаунт" showBackButton onBack={onBack}>
      <SignUpForm {...props} />

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
