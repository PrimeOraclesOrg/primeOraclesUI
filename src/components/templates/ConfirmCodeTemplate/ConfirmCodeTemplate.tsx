/**
 * ConfirmCodeTemplate
 *
 * Presentational component for the verification code step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ConfirmCodeForm } from "@/components/organisms/ConfirmCodeForm/ConfirmCodeForm";
import { FormEvent } from "react";

interface ConfirmCodeTemplateProps {
  onBack: () => void;
  email: string;
  resendTimer: number;
  onResendCode: () => void;
  code: string;
  setCode: (code: string) => void;
  codeMode: 'signup' | 'recovery';
  error: string;
  onConfirmCode: (event: FormEvent) => void;
  isLoading: boolean;
  isResending: boolean;
  onHelpClick: () => void;
}

export function ConfirmCodeTemplate({
  onBack,
  onResendCode,
  resendTimer,
  isResending,
  onHelpClick,
  ...props
}: ConfirmCodeTemplateProps) {
  return (
    <AuthLayout
      title="Подтвердите код"
      subtitle={`На ваш адрес ${props.email} отправлен код`}
      showBackButton
      onBack={onBack}
    >
      <ConfirmCodeForm {...props} />

      {/* Resend section */}
      <div className="text-center mt-8 pt-4 space-y-2">
        {resendTimer > 0 && (
          <p className="text-sm text-primary font-medium">
            Повторная отправка через {resendTimer} сек
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Не получили код?{" "}
          <button
            type="button"
            onClick={onResendCode}
            disabled={resendTimer > 0 || isResending}
            className="text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? "Отправка..." : "Отправить снова"}
          </button>
        </p>
        <p className="text-sm text-muted-foreground">
          <button
            type="button"
            onClick={onHelpClick}
            className="text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Что делать если код не приходит?
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
