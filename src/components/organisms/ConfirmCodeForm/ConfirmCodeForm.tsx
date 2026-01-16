import { CodeInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { VerificationCodeFormData } from "@/utils";
import { FieldErrors, Control, Controller } from "react-hook-form";

interface ConfirmCodeFormProps {
  codeMode: "signup" | "recovery";
  onSubmit: () => void;
  errors: FieldErrors<VerificationCodeFormData>;
  isSubmitting: boolean;
  control: Control<VerificationCodeFormData>;
  onReset: () => void;
}

export const ConfirmCodeForm = ({
  codeMode,
  onSubmit,
  errors,
  isSubmitting,
  control,
  onReset
}: ConfirmCodeFormProps) => {
  const buttonText = codeMode === "signup" ? "Подтвердить" : "Восстановить пароль";
  const loadingText = "Проверка...";

  return (
    <form className="space-y-6 flex flex-col items-center" onSubmit={onSubmit} onReset={onReset}>
      <Controller
        name="code"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CodeInput
            length={8}
            value={value}
            onChange={onChange}
            error={errors.code?.message}
            disabled={isSubmitting}
          />
        )}
      />
         <p className="text-sm text-muted-foreground">
          <button
            type="reset"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Очистить поле
          </button>
        </p>

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? loadingText : buttonText}
      </Button>
    </form>
  );
};
