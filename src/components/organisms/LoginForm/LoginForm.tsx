import { AuthInput, PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { LoginErrors } from "@/pages/Login";
import { FormEvent } from "react";

interface LoginFormProps {
  onLogin: (event: FormEvent<Element>) => void;
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  password: string;
  setPassword: (password: string) => void;
  errors: LoginErrors;
  toForgotPassword: () => void;
}

export const LoginForm = ({
  email,
  onLogin,
  setEmail,
  isLoading,
  password,
  setPassword,
  errors,
  toForgotPassword,
}: LoginFormProps) => {
  return (
    <form className="space-y-5" onSubmit={onLogin}>
      <AuthInput
        label="Э-почта"
        type="email"
        placeholder="Э-почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
        disabled={isLoading}
      />

      <PasswordInput
        label="Пароль"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="current-password"
        disabled={isLoading}
        labelRight={
          <button
            type="button"
            onClick={toForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-normal"
          >
            Забыли пароль?
          </button>
        }
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};
