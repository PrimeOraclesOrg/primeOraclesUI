/**
 * ConfirmCodeTemplate
 *
 * Presentational component for the verification code page.
 */

import { Logo } from "@/components/atoms/Logo/Logo";
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
}: ConfirmCodeTemplateProps) {
  const buttonText =
    mode === "register" ? "Подтвердить" : "Восстановить пароль";
  const loadingText = "Проверка...";
  const backPath = mode === "register" ? "/register" : "/forgot-password";

  return (
    <AuthLayout showBackButton backPath={backPath}>
      <div className="flex flex-col items-center space-y-5 sm:space-y-6">
        <Logo size="lg" />

        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
            Подтвердите код
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            На ваш адрес{" "}
            <span className="text-foreground font-medium">{email}</span>{" "}
            отправлен код
          </p>
        </div>

        <form onSubmit={onSubmit} className="w-full space-y-5 sm:space-y-6">
          <CodeInput
            length={8}
            value={code}
            onChange={onCodeChange}
            error={error}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium gold-gradient hover:opacity-90 transition-opacity active:scale-[0.98]"
            disabled={isLoading || code.length !== 8}
          >
            {isLoading ? loadingText : buttonText}
          </Button>
        </form>

        <div className="text-center space-y-2">
          {resendTimer > 0 && (
            <p className="text-sm text-primary font-medium">
              Повторная отправка через {resendTimer} сек
            </p>
          )}
          <p className="text-sm sm:text-base text-muted-foreground">
            Не получили код?{" "}
            <button
              type="button"
              onClick={onResend}
              disabled={resendTimer > 0 || isResending}
              className="text-primary hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isResending ? "Отправка..." : "Отправить снова"}
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
