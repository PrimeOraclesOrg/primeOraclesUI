/**
 * ForgotPasswordTemplate
 *
 * Presentational component for the forgot password step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthInput } from "@/components/molecules/AuthInput/AuthInput";
import { Button } from "@/components/ui/button";
import { ForgotPasswordForm } from "@/components/organisms";

interface ForgotPasswordTemplateProps {
  goToConfirmCode: () => void;
  onBack: () => void;
}

export function ForgotPasswordTemplate({
  goToConfirmCode,
  onBack,
}: ForgotPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Восстановление пароля"
      subtitle="Введите email, и мы отправим вам код для восстановления"
      showBackButton
      onBack={onBack}
    >
      <ForgotPasswordForm goToConfirmCode={goToConfirmCode} />

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
