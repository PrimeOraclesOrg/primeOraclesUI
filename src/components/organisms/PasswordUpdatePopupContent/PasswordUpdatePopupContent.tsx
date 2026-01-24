import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PasswordUpdateForm } from "../PasswordUpdateForm/PasswordUpdateForm";
import { Control, FieldErrors, UseFormRegister, UseFormResetField } from "react-hook-form";
import { UpdatePasswordFormData } from "@/utils";

interface PasswordUpdatePopupContentProps {
  onSubmit: () => void;
  errors: FieldErrors<UpdatePasswordFormData>;
  isSubmitting: boolean;
  control: Control<UpdatePasswordFormData>;
  register: UseFormRegister<UpdatePasswordFormData>;
  resetField: UseFormResetField<UpdatePasswordFormData>;
}

export const PasswordUpdatePopupContent = (props: PasswordUpdatePopupContentProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">Изменение пароля</DialogTitle>
      </DialogHeader>

      <PasswordUpdateForm {...props} />
    </>
  );
};
