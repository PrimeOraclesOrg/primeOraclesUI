/**
 * RegisterTemplate
 *
 * Presentational component for the registration step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { SignUpForm } from "@/components/organisms";

interface RegisterTemplateProps {
  onBack: () => void;
  goToConfirmCode: (email: string) => void;
}

export function SignUpTemplate({ onBack, goToConfirmCode }: RegisterTemplateProps) {
  return (
    <AuthLayout title="Создать аккаунт" showBackButton onBack={onBack}>
      <SignUpForm goToConfirmCode={goToConfirmCode} />

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
