/**
 * ForgotPasswordTemplate
 *
 * Presentational component for the forgot password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
import { Button } from "@/components/ui/button";

interface ForgotPasswordTemplateProps {
  email: string;
  error?: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function ForgotPasswordTemplate({
  email,
  error,
  isLoading,
  onEmailChange,
  onSubmit,
  onBack,
}: ForgotPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Восстановление пароля"
      subtitle="Введите email, и мы отправим вам код для восстановления"
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
          error={error}
          autoComplete="email"
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Отправка..." : "Восстановить пароль"}
        </Button>
      </form>

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
