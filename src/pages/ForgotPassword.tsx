/**
 * ForgotPassword Page
 * 
 * Handles forgot password flow.
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordTemplate } from "@/components/templates/ForgotPasswordTemplate/ForgotPasswordTemplate";
import { forgotPasswordSchema } from "@/utils/validators";
import { resetPassword } from "@/services/authService";
import { toast } from "@/hooks/useToast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(undefined);

      // Validate email
      const result = forgotPasswordSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      setIsLoading(true);
      try {
        const { error: apiError } = await resetPassword(email);
        if (apiError) {
          toast({
            title: "Ошибка",
            description: apiError.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Код отправлен",
            description: `Проверьте вашу почту ${email}`,
          });
          navigate("/confirm-code", { state: { email, mode: "reset" } });
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
    [email, navigate]
  );

  return (
    <ForgotPasswordTemplate
      email={email}
      error={error}
      isLoading={isLoading}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
    />
  );
}
