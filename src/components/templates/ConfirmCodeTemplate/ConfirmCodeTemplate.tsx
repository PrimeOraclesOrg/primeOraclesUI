/**
 * ConfirmCodeTemplate
 *
 * Presentational component for the verification code step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ConfirmCodeForm } from "@/components/organisms/ConfirmCodeForm/ConfirmCodeForm";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/useToast";
import { resendSignUpOtp } from "@/services";

interface ConfirmCodeTemplateProps {
  email: string;
  mode: "signup" | "recovery";
  goToResetPassword: () => void;
  onBack: () => void;
}

export function ConfirmCodeTemplate({
  email,
  mode,
  goToResetPassword,
  onBack,
}: ConfirmCodeTemplateProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const handleResendCode = useCallback(async () => {
    setIsResending(true);
    try {
      const { error } = await resendSignUpOtp(email);
      if (error) throw error;
      setResendTimer(60);
      toast({
        title: "Код отправлен",
        description: "Проверьте вашу почту",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить код",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  }, [email]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <AuthLayout
      title="Подтвердите код"
      subtitle={`На ваш адрес ${email} отправлен код`}
      showBackButton
      onBack={onBack}
    >
      <ConfirmCodeForm mode={mode} email={email} goToResetPassword={goToResetPassword} />

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
            onClick={handleResendCode}
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
