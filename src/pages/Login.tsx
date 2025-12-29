/**
 * Login Page
 * 
 * Handles login business logic and state.
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoginTemplate } from "@/components/templates/LoginTemplate/LoginTemplate";
import { loginSchema } from "@/utils/validators";
import { signIn } from "@/services/authService";
import { toast } from "@/hooks/useToast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      // Validate form
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        const fieldErrors: { email?: string; password?: string } = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as "email" | "password";
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signIn({ email, password });
        if (error) {
          toast({
            title: "Ошибка входа",
            description: "Неверный email или пароль",
            variant: "destructive",
          });
        } else {
          navigate("/");
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
    [email, password, navigate]
  );

  return (
    <LoginTemplate
      email={email}
      password={password}
      errors={errors}
      isLoading={isLoading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
