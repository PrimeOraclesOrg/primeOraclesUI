/**
 * SignUpTemplate
 *
 * Presentational component for the registration step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { SignUpForm } from "@/components/organisms";
import { RegisterFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface SignUpTemplateProps {
  onSubmit: () => void;
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  isSubmitting: boolean;
  onBack: () => void;
  onClose: () => void;
}

export function SignUpTemplate({
  onBack,
  onSubmit,
  register,
  errors,
  isSubmitting,
  onClose,
}: SignUpTemplateProps) {
  return (
    <AuthLayout title="Создать аккаунт" showBackButton onBack={onBack} onClose={onClose}>
      <SignUpForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />

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
