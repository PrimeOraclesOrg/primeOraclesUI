import { LoginForm } from "@/components/organisms";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { LoginFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface LoginTemplateProps {
  onSubmit: () => void;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isSubmitting: boolean;
  toForgotPassword: () => void;
  toSignUp: () => void;
  onClose?: () => void;
}

export function LoginTemplate({
  toSignUp,
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
  toForgotPassword,
}: LoginTemplateProps) {
  return (
    <AuthLayout title="Вход в аккаунт" onClose={onClose}>
      <LoginForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        toForgotPassword={toForgotPassword}
      />

      <div className="flex flex-col items-center justify-center mt-8 pt-4">
        <p className="text-sm text-foreground">
          Нет аккаунта?{" "}
          <button
            type="button"
            onClick={toSignUp}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Регистрация
          </button>
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Регистрируясь, вы соглашаетесь с Условиями <br />
          обслуживания и Политикой конфиденциальности
          <br />
          Prime Oracles.
        </p>
      </div>
    </AuthLayout>
  );
}
