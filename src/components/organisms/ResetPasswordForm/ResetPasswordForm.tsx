import { PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { ResetPasswordFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ResetPasswordFormProps {
  onSubmit: () => void;
  register: UseFormRegister<ResetPasswordFormData>;
  errors: FieldErrors<ResetPasswordFormData>;
  isSubmitting: boolean;
}

export const ResetPasswordForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
}: ResetPasswordFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <PasswordInput
        label="Новый пароль"
        placeholder="Введите новый пароль"
        {...register("password")}
        error={errors.password?.message}
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <PasswordInput
        label="Повтор пароля"
        placeholder="Подтвердите пароль"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Сохранение..." : "Подтвердить"}
      </Button>
    </form>
  );
};
