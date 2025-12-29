/**
 * ConfirmCode Page
 * 
 * Handles verification code logic for registration and password reset.
 */

import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ConfirmCodeTemplate } from "@/components/templates/ConfirmCodeTemplate/ConfirmCodeTemplate";
import { verificationCodeSchema } from "@/utils/validators";
import { toast } from "@/hooks/useToast";

const RESEND_COOLDOWN = 30; // seconds

export default function ConfirmCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email = "", mode = "register" } = (location.state as { email?: string; mode?: "register" | "reset" }) || {};

  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(undefined);

      // Validate code
      const result = verificationCodeSchema.safeParse(code);
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // Simulate verification
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo: any 8-digit code with all same digits is invalid
        if (/^(\d)\1{7}$/.test(code)) {
          setError("Неверный код. Попробуйте снова.");
          return;
        }

        if (mode === "register") {
          toast({
            title: "Успешная регистрация!",
            description: "Добро пожаловать в Prime Oracles",
          });
          navigate("/");
        } else {
          // Redirect to reset password page
          navigate("/reset-password", { state: { email, code } });
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
    [code, mode, email, navigate]
  );

  const handleResend = useCallback(async () => {
    setIsResending(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Код отправлен",
        description: `Новый код отправлен на ${email}`,
      });
      setResendTimer(RESEND_COOLDOWN);
      setCode("");
      setError(undefined);
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить код. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  }, [email]);

  if (!email) {
    return null;
  }

  return (
    <ConfirmCodeTemplate
      email={email}
      code={code}
      error={error}
      isLoading={isLoading}
      isResending={isResending}
      resendTimer={resendTimer}
      mode={mode}
      onCodeChange={setCode}
      onSubmit={handleSubmit}
      onResend={handleResend}
    />
  );
}
