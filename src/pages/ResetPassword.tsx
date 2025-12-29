/**
 * ResetPassword Page
 * 
 * Handles creating a new password after code verification.
 */

import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResetPasswordTemplate } from "@/components/templates/ResetPasswordTemplate/ResetPasswordTemplate";
import { resetPasswordSchema } from "@/utils/validators";
import { updatePassword } from "@/services/authService";
import { toast } from "@/hooks/useToast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = (location.state as { email?: string; code?: string }) || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if no code in state
  useEffect(() => {
    if (!email || !code) {
      navigate("/login");
    }
  }, [email, code, navigate]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      // Validate form
      const result = resetPasswordSchema.safeParse({ password, confirmPassword });
      if (!result.success) {
        const fieldErrors: { password?: string; confirmPassword?: string } = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as "password" | "confirmPassword";
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await updatePassword(password);
        if (error) {
          toast({
            title: "Ошибка",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Пароль изменён",
            description: "Теперь вы можете войти с новым паролем",
          });
          navigate("/login");
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
    [password, confirmPassword, navigate]
  );

  if (!email || !code) {
    return null;
  }

  return (
    <ResetPasswordTemplate
      password={password}
      confirmPassword={confirmPassword}
      errors={errors}
      isLoading={isLoading}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleSubmit}
    />
  );
}
