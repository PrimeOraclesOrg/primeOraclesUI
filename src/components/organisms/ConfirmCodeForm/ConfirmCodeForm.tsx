import { CodeInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { verifyOtp } from "@/services";
import { verificationCodeSchema } from "@/utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ConfirmCodeFormProps {
  email: string;
  mode: "signup" | "recovery";
  goToResetPassword: () => void;
}

export const ConfirmCodeForm = ({ email, mode, goToResetPassword }: ConfirmCodeFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const buttonText = mode === "signup" ? "Подтвердить" : "Восстановить пароль";
  const loadingText = "Проверка...";

  const handleConfirmCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      const result = verificationCodeSchema.safeParse(code);

      if (!result.success) {
        setError(result.error.errors[0]?.message);
        return;
      }

      console.log(result.data);

      setIsLoading(true);
      try {
        const { error } = await verifyOtp({ email, code, type: mode });

        if (error) {
          toast({
            title: "Ошибка подтверждения",
            description: error.message,
            variant: "destructive",
          });
        } else {
          if (mode === "signup") {
            toast({
              title: "Успешно",
              description: "Регистрация завершена",
            });
            navigate("/");
          }
          if (mode === "recovery") goToResetPassword();
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
    [email, code, mode, navigate, goToResetPassword]
  );

  return (
    <form className="space-y-6" onSubmit={handleConfirmCode}>
      <CodeInput length={8} value={code} onChange={setCode} error={error} disabled={isLoading} />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg"
        disabled={isLoading || code.length !== 8}
      >
        {isLoading ? loadingText : buttonText}
      </Button>
    </form>
  );
};
