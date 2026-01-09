import { AuthInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "@/hooks/useToast";
import { resetPassword } from "@/services";
import { forgotPasswordSchema } from "@/utils";
import { useCallback, useState } from "react";

export const ForgotPasswordForm = () => {
  const { email, setCodeMode, setView, setEmail } = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      const result = forgotPasswordSchema.safeParse({ email: email });

      if (!result.success) {
        setError(result.error.errors[0]?.message);
        return;
      }

      setIsLoading(true);
      const { error } = await resetPassword(email);
      if (error) {
        toast({
          title: "Ошибка",
          description: error.code,
          variant: "destructive",
        });
      } else {
        setCodeMode("recovery");
        setView("confirm-code");
      }
      setIsLoading(false);
    },
    [email, setCodeMode, setView]
  );

  return (
    <form className="space-y-5" onSubmit={handleForgotPassword}>
      <AuthInput
        label="Э-почта"
        type="email"
        placeholder="Э-почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        autoComplete="email"
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Отправка..." : "Восстановить пароль"}
      </Button>
    </form>
  );
};
