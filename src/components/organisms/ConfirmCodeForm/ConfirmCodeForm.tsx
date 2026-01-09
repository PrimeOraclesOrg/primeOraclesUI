import { CodeInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "@/hooks/useToast";
import { signOut, verifyOtp } from "@/services";
import { verificationCodeSchema } from "@/utils";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const ConfirmCodeForm = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setView, codeMode, email } = useAuthModal();
  const { t } = useTranslation();

  const buttonText = codeMode === "signup" ? "Подтвердить" : "Восстановить пароль";
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
        const { error } = await verifyOtp({ email, code, type: codeMode });

        if (error) {
          toast({
            title: "Ошибка подтверждения",
            description: t(`status:${error.code}`),
            variant: "destructive",
          });
        } else {
          if (codeMode === "signup") {
            toast({
              title: "Успешно",
              description: "Регистрация завершена. Теперь вы можете войти в свой аккаунт",
            });
            await signOut();
            setView("login");
          }
          if (codeMode === "recovery") setView("reset-password");
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
    [email, code, setView, codeMode, t]
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
