import { PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "@/hooks/useToast";
import { signOut, updatePassword } from "@/services";
import { resetPasswordSchema } from "@/utils";
import { useCallback, useState } from "react";

interface Errors {
  password?: string;
  confirmPassword?: string;
}

export const ResetPasswordForm = () => {
  const { setView } = useAuthModal();
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
        confirmPassword,
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
      const { error } = await updatePassword(password);
      if (error) {
        toast({
          title: "Ошибка",
          description: error.code,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Пароль изменён",
          description: "Теперь вы можете войти с новым паролем",
        });
        await signOut();
        setView("login");
      }
      setIsLoading(false);
    },
    [password, confirmPassword, setView]
  );

  return (
    <form className="space-y-5" onSubmit={handleResetPassword}>
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
