import { AuthInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { ForgotPasswordFormData } from "@/utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ForgotPasswordFormProps {
  onSubmit: () => void;
  register: UseFormRegister<ForgotPasswordFormData>;
  errors: FieldErrors<ForgotPasswordFormData>;
  isSubmitting: boolean;
}

export const ForgotPasswordForm = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: ForgotPasswordFormProps) => {
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

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Отправка..." : "Восстановить пароль"}
      </Button>
    </form>
  );
};
