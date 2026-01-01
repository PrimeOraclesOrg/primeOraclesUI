import { AuthInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { resetPassword } from "@/services";
import { forgotPasswordSchema } from "@/utils";
import { useCallback, useState } from "react";

interface ForgotPasswordFormProps {
  goToConfirmCode: (email: string) => void;
}

export const ForgotPasswordForm = ({ goToConfirmCode }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
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
      try {
        if (error) {
          toast({
            title: "Ошибка",
            description: error.message,
            variant: "destructive",
          });
        } else {
          goToConfirmCode(email);
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
    [email, goToConfirmCode]
  );

  return (
    <form className="space-y-5" onSubmit={handleForgotPassword}>
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="Email"
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
