/**
 * Register Page
 * 
 * Handles registration business logic and state.
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterTemplate } from "@/components/templates/RegisterTemplate/RegisterTemplate";
import { registerSchema } from "@/utils/validators";
import { signUp } from "@/services/authService";
import { toast } from "@/hooks/useToast";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      // Validate form
      const result = registerSchema.safeParse({ email, password, confirmPassword });
      if (!result.success) {
        const fieldErrors: {
          email?: string;
          password?: string;
          confirmPassword?: string;
        } = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as "email" | "password" | "confirmPassword";
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signUp({ email, password });
        if (error) {
          toast({
            title: "Ошибка регистрации",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // Navigate to confirm code page with email
          navigate("/confirm-code", { state: { email, mode: "register" } });
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
    [email, password, confirmPassword, navigate]
  );

  return (
    <RegisterTemplate
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      errors={errors}
      isLoading={isLoading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleSubmit}
    />
  );
}
