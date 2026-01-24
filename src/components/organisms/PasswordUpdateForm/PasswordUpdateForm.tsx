import { CodeInput, PasswordInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UpdatePasswordFormData } from "@/utils";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";

interface PasswordUpdateFormProps {
  onSubmit: () => void;
  errors: FieldErrors<UpdatePasswordFormData>;
  isSubmitting: boolean;
  control: Control<UpdatePasswordFormData>;
  register: UseFormRegister<UpdatePasswordFormData>;
  resetField: UseFormResetField<UpdatePasswordFormData>;
}

export const PasswordUpdateForm = ({
  register,
  control,
  errors,
  isSubmitting,
  resetField,
  onSubmit,
}: PasswordUpdateFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-foreground text-sm font-normal">Код с э-почты</Label>
      </div>
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
          type="button"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
          onClick={() => resetField("code", { defaultValue: "" })}
        >
          Очистить поле
        </button>
      </p>

      <PasswordInput
        label="Пароль"
        placeholder="Введите пароль"
        {...register("password")}
        error={errors.password?.message}
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <PasswordInput
        label="Повтор пароля"
        placeholder="Подтвердите пароль"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
};
