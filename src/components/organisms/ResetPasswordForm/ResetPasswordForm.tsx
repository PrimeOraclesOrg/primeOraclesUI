import { PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

interface ResetPasswordFormProps {
  onChangePassword: (event: FormEvent) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  errors: { password?: string; confirmPassword?: string };
  isLoading: boolean;
}

export const ResetPasswordForm = ({
  onChangePassword,
  confirmPassword,
  password,
  setConfirmPassword,
  setPassword,
  errors,
  isLoading,
}: ResetPasswordFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onChangePassword}>
      <PasswordInput
        label="Новый пароль"
        placeholder="Введите новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
        disabled={isLoading}
      />

      <PasswordInput
        label="Повтор пароля"
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Сохранение..." : "Подтвердить"}
      </Button>
    </form>
  );
};
