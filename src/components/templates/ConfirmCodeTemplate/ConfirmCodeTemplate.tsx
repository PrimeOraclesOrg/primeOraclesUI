import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ConfirmCodeForm } from "@/components/organisms/ConfirmCodeForm/ConfirmCodeForm";
import { VerificationCodeFormData } from "@/utils";
import { FieldErrors, Control } from "react-hook-form";

interface ConfirmCodeTemplateProps {
  onBack: () => void;
  email: string;
  resendTimer: number;
  onResendCode: () => void;
  onSubmit: () => void;
  control: Control<VerificationCodeFormData>;
  errors: FieldErrors<VerificationCodeFormData>;
  isSubmitting: boolean;
  isResending: boolean;
  onHelpClick: () => void;
  codeMode: "signup" | "recovery";
  onReset: () => void;
  onClose: () => void;
}

export function ConfirmCodeTemplate({
  onBack,
  onResendCode,
  resendTimer,
  isResending,
  onHelpClick,
  email,
  onSubmit,
  control,
  errors,
  isSubmitting,
  codeMode,
  onReset,
  onClose,
}: ConfirmCodeTemplateProps) {
  return (
    <AuthLayout
      title="Подтвердите код"
      subtitle={`На ваш адрес ${email} отправлен код`}
      showBackButton
      onBack={onBack}
      onClose={onClose}
    >
      <ConfirmCodeForm
        onSubmit={onSubmit}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        codeMode={codeMode}
        onReset={onReset}
      />

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
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Что делать если код не приходит?
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
