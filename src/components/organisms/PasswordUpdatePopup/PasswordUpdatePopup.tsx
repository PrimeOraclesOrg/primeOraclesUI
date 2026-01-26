import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PasswordUpdateForm } from "../PasswordUpdateForm/PasswordUpdateForm";
import { Control, FieldErrors, UseFormRegister, UseFormResetField } from "react-hook-form";
import { UpdatePasswordFormData } from "@/utils";
import { DialogDescription } from "@radix-ui/react-dialog";

interface PasswordUpdatePopupContentProps {
  onSubmit: () => void;
  errors: FieldErrors<UpdatePasswordFormData>;
  isSubmitting: boolean;
  control: Control<UpdatePasswordFormData>;
  register: UseFormRegister<UpdatePasswordFormData>;
  resetField: UseFormResetField<UpdatePasswordFormData>;
  isChangePasswordDialogOpen: boolean;
  setIsChangePasswordDialogOpen: (isOpen: boolean) => void;
  onResendCode: () => void;
  resendTimer: number;
  isResending: boolean;
}

export const PasswordUpdatePopup = ({
  isChangePasswordDialogOpen,
  setIsChangePasswordDialogOpen,
  onResendCode,
  resendTimer,
  isResending,
  control,
  errors,
  isSubmitting,
  onSubmit,
  register,
  resetField,
}: PasswordUpdatePopupContentProps) => {
  return (
    <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
      <DialogContent className="sm:max-w-md bg-background border-secondary">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Изменение пароля</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            На ваш адрес э-почты отправлен код
          </DialogDescription>
        </DialogHeader>

        <PasswordUpdateForm
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          register={register}
          resetField={resetField}
        />

        <div className="text-center mt-8 pt-4 space-y-2">
          {resendTimer > 0 && (
            <p className="text-sm text-primary font-medium">
              Повторная отправка через {resendTimer} сек
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Не получили код?{" "}
            <button
              type="button"
              onClick={onResendCode}
              disabled={resendTimer > 0 || isResending}
              className="text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? "Отправка..." : "Отправить снова"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
