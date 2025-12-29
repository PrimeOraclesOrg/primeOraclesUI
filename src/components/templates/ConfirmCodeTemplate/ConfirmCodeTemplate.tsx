/**
 * ConfirmCodeTemplate
 *
 * Presentational component for the verification code step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { CodeInput } from "@/components/molecules/CodeInput/CodeInput";
import { Button } from "@/components/ui/button";

interface ConfirmCodeTemplateProps {
  email: string;
  code: string;
  error?: string;
  isLoading: boolean;
  isResending: boolean;
  resendTimer: number;
  mode: "register" | "reset";
  onCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
}

export function ConfirmCodeTemplate({
  email,
  code,
  error,
  isLoading,
  isResending,
  resendTimer,
  mode,
  onCodeChange,
  onSubmit,
  onResend,
  onBack,
}: ConfirmCodeTemplateProps) {
  const buttonText =
    mode === "register" ? "Подтвердить" : "Восстановить пароль";
  const loadingText = "Проверка...";

  return (
    <AuthLayout
      title="Подтвердите код"
      subtitle={`На ваш адрес ${email} отправлен код`}
      showBackButton
      onBack={onBack}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <CodeInput
          length={8}
          value={code}
          onChange={onCodeChange}
          error={error}
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg"
          disabled={isLoading || code.length !== 8}
        >
          {isLoading ? loadingText : buttonText}
        </Button>
      </form>

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
            onClick={onResend}
            disabled={resendTimer > 0 || isResending}
            className="text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? "Отправка..." : "Отправить снова"}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
