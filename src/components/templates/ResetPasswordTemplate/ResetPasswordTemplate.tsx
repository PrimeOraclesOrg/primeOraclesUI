import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm/ResetPasswordForm";
import { ResetPasswordFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ResetPasswordTemplateProps {
  onSubmit: () => void;
  register: UseFormRegister<ResetPasswordFormData>;
  errors: FieldErrors<ResetPasswordFormData>;
  isSubmitting: boolean;
  onBack: () => void;
}

export function ResetPasswordTemplate({
  onBack,
  onSubmit,
  register,
  errors,
  isSubmitting,
}: ResetPasswordTemplateProps) {
  return (
    <AuthLayout
      title="Новый пароль"
      subtitle="Введите новый пароль для вашего аккаунта"
      showBackButton
      onBack={onBack}
    >
      <ResetPasswordForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </AuthLayout>
  );
}
