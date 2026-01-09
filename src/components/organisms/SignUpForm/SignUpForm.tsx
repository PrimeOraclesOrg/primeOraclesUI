import { AuthInput, PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "@/hooks/useToast";
import { signUp } from "@/services";
import { registerSchema } from "@/utils";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUpForm = () => {
  const { email, setEmail, setCodeMode, setView } = useAuthModal();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = registerSchema.safeParse({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (!result.success) {
        const fieldErrors: Errors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof Errors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signUp({
          email: email,
          password: password,
        });
        if (error) {
          toast({
            title: "Ошибка регистрации",
            description: t(`status:${error.code}`),
            variant: "destructive",
          });
        } else {
          setCodeMode("signup");
          setView("confirm-code");
        }
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
    [email, password, confirmPassword, setCodeMode, setView, t]
  );

  return (
    <form className="space-y-5" onSubmit={handleSignUp}>
      <AuthInput
        label="Э-почта"
        type="email"
        placeholder="Э-почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
        disabled={isLoading}
      />

      <PasswordInput
        label="Пароль"
        placeholder="Введите пароль"
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
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
};
