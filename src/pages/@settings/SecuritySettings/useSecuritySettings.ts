import { signOut } from "@/services";
import { useAppDispatch } from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SettingsTab } from "../types";
import { useForm } from "react-hook-form";
import { UpdatePasswordFormData, updatePasswordSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSecuritySettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const onTabChange = (tab: SettingsTab) => navigate(`/settings/${tab}`);

  const onLogout = async () => {
    await signOut();
    navigate("/");
  };

  const updatePasswordForm = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onUpdatePasswordSubmit = async (data: UpdatePasswordFormData) => {
    console.log(data);
  };

  const handlePasswordChangeClick = () => setIsChangePasswordDialogOpen(true);

  return {
    onTabChange,
    onLogout,
    isChangePasswordDialogOpen,
    setIsChangePasswordDialogOpen,
    updatePasswordForm,
    onUpdatePasswordSubmit,
    handlePasswordChangeClick,
  };
};
