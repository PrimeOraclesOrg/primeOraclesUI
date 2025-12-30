import { CodeInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { verificationCodeSchema } from "@/utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ConfirmCodeFormProps {
  mode: 'register' | 'reset';
  goToResetPassword: () => void;
}

export const ConfirmCodeForm = ({ mode, goToResetPassword }: ConfirmCodeFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const buttonText = mode === "register" ? "Подтвердить" : "Восстановить пароль";
  const loadingText = "Проверка...";

  const handleConfirmCode = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
  
        const result = verificationCodeSchema.safeParse({ code: code });
  
        if (!result.success) {
          setError(result.error.errors[0]?.message);
          return;
        }
  
        setIsLoading(true);
        try {
          // Simulate code verification
          await new Promise((resolve) => setTimeout(resolve, 1000));
  
          // Mock verification - in real app, call API
          if (code === "12345678") {
            if (mode === "register") {
              toast({
                title: "Успешно",
                description: "Регистрация завершена",
              });
              navigate("/");
            } else {
              goToResetPassword();
            }
          } else {
            setError("Неверный код. Попробуйте снова.");
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
      [code, mode, navigate, goToResetPassword]
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
