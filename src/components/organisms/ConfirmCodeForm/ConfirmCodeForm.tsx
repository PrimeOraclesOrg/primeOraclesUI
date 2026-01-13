import { CodeInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { AuthCodeMode } from "@/store";
import { FormEvent } from "react";

interface ConfirmCodeFormProps {
  codeMode: AuthCodeMode;
  code: string;
  setCode: (code: string) => void;
  onConfirmCode: (event: FormEvent) => void;
  error: string;
  isLoading: boolean;
}

export const ConfirmCodeForm = ({
  codeMode,
  code,
  setCode,
  onConfirmCode,
  error,
  isLoading,
}: ConfirmCodeFormProps) => {
  const buttonText = codeMode === "signup" ? "Подтвердить" : "Восстановить пароль";
  const loadingText = "Проверка...";

  return (
    <form className="space-y-6" onSubmit={onConfirmCode}>
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
