import { AuthInput, PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { RegisterFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface SignUpFormProps {
  onSubmit: () => void;
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  isSubmitting: boolean;
}

export const SignUpForm = ({ onSubmit, register, errors, isSubmitting }: SignUpFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <AuthInput
        label="Э-почта"
        type="email"
        placeholder="Э-почта"
        {...register("email")}
        error={errors.email?.message}
        autoComplete="email"
        disabled={isSubmitting}
      />

      <PasswordInput
        label="Пароль"
        placeholder="Введите пароль"
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
        className="w-full h-12 text-base font-medium bg-secondary/5 hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6 shadow-inner-glass"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
};
