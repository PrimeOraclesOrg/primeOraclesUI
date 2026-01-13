import { AuthInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

interface FogotPasswordFormProps {
  onForgotPassword: (event: FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  error: string;
  isLoading: boolean;
}

export const ForgotPasswordForm = ({
  email,
  setEmail,
  error,
  isLoading,
  onForgotPassword,
}: FogotPasswordFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onForgotPassword}>
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
