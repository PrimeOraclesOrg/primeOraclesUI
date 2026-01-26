import { selectAuthUser, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { UpdatePasswordFormData, updatePasswordSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword, requestPasswordChange } from "@/services";
import { toast } from "@/hooks/useToast";

export const useSecuritySettings = () => {
  const { t } = useTranslation();
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSendingPasswordChange, setIsSendingPasswordChange] = useState(false);
  const user = useAppSelector(selectAuthUser);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const updatePasswordForm = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onUpdatePasswordSubmit = async ({ code, password }: UpdatePasswordFormData) => {
    const { data, error } = await changePassword({
      email: user.email,
      newPassword: password,
      otpToken: code,
      isCodeVerified,
    });

    if (data.isVerified) setIsCodeVerified(true);

    if (error) {
      toast({
        title: "Ошибка",
        description: t(`status:${error.code}`) || error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успех",
      description: "Пароль успешно изменен",
      variant: "default",
    });

    setIsChangePasswordDialogOpen(false);
    setIsCodeVerified(false);
    setResendTimer(0);
  };

  const handlePasswordChangeClick = async () => {
    if (resendTimer <= 0) {
      const { error } = await sendPasswordChangeEmail();
      if (error) return;
    }
    updatePasswordForm.reset();
    setIsChangePasswordDialogOpen(true);
  };

  const sendPasswordChangeEmail = async () => {
    setIsSendingPasswordChange(true);
    const { error } = await requestPasswordChange(user.email);
    setIsSendingPasswordChange(false);
    if (error) {
      toast({
        title: "Ошибка",
        description: t(`status:${error.code}`) || error.message,
        variant: "destructive",
      });

      return {
        error,
      };
    }
    setResendTimer(60);
    setIsCodeVerified(false);
    return {
      error: null,
    };
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return {
    resendTimer,
    isChangePasswordDialogOpen,
    setIsChangePasswordDialogOpen,
    updatePasswordForm,
    onUpdatePasswordSubmit,
    handlePasswordChangeClick,
    isSendingPasswordChange,
    sendPasswordChangeEmail,
  };
};
