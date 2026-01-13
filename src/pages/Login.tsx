import { LoginTemplate } from "@/components/templates";
import { toast } from "@/hooks/useToast";
import { signIn } from "@/services";
import { loginSchema } from "@/utils";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface LoginErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation("status");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const routeAfterLogin = "/";

  const handleLogin = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
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
          navigate(routeAfterLogin);
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
    [email, password, setIsLoading, setErrors, navigate, t]
  );

  return (
    <LoginTemplate
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errors={errors}
      isLoading={isLoading}
      onLogin={handleLogin}
      toForgotPassword={() => navigate("/reset-password")}
      toSignUp={() => navigate("/sign-up")}
      onClose={() => navigate("/")}
    />
  );
}
