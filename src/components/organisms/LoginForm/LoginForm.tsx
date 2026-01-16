import { AuthInput, PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { LoginFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface LoginFormProps {
  onSubmit: () => void;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isSubmitting: boolean;
  toForgotPassword: () => void;
}

export const LoginForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  toForgotPassword,
}: LoginFormProps) => {
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
        placeholder="Пароль"
        {...register("password")}
        error={errors.password?.message}
        autoComplete="current-password"
        disabled={isSubmitting}
        labelRight={
          <button
            type="button"
            onClick={toForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-normal"
          >
            Забыли пароль?
          </button>
        }
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};