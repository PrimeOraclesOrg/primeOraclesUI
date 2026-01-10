import { AuthInput, PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "@/hooks/useToast";
import { signIn } from "@/services";
import { loginSchema } from "@/utils";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
}

export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { email, setEmail, setView } = useAuthModal();

  const navigate = useNavigate();
  const { close, routeAfterLogin } = useAuthModal();
  const { t } = useTranslation('status');

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = loginSchema.safeParse({
        email: email,
        password: password,
      });

      if (!result.success) {
        const fieldErrors: LoginErrors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof LoginErrors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signIn({
          email: email,
          password: password,
        });
        if (error) {
          toast({
            title: "Ошибка входа",
            description: t(`status:${error.code}`),
            variant: "destructive",
          });
        } else {
          close();
          if (routeAfterLogin) navigate(routeAfterLogin);
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
    [email, password, navigate, close, routeAfterLogin, t]
  );

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
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
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="current-password"
        disabled={isLoading}
        labelRight={
          <button
            type="button"
            onClick={() => setView("forgot-password")}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-normal"
          >
            Забыли пароль?
          </button>
        }
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};
