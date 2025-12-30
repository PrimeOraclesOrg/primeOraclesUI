import { PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { resetPasswordSchema } from "@/utils";
import { useCallback, useState } from "react";

interface Errors {
  password?: string;
  confirmPassword?: string;
}

interface ResetPasswordForm {
  goToLogin: () => void;
}

export const ResetPasswordForm = ({ goToLogin }: ResetPasswordForm) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = resetPasswordSchema.safeParse({
        password,
        confirmPassword
      });

      if (!result.success) {
        const fieldErrors: Errors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (field === "password") fieldErrors.password = err.message;
          if (field === "confirmPassword") fieldErrors.confirmPassword = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate password reset
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({
          title: "Пароль изменён",
          description: "Теперь вы можете войти с новым паролем",
        });
        goToLogin();
      } catch {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка. Попробуйте позже.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [password, confirmPassword, goToLogin]
  );

  return (
    <form className="space-y-5" onSubmit={handleResetPassword}>
      <PasswordInput
        label="New Password"
        placeholder="Введите новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
        disabled={isLoading}
      />

      <PasswordInput
        label="Confirm Password"
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
