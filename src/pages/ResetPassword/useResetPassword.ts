import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { resetPassword, signOut, updatePassword, verifyOtp } from "@/services";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
  ResetPasswordFormData,
  resetPasswordSchema,
  VerificationCodeFormData,
  verificationCodeSchema,
} from "@/utils";
import { ConfirmCodeHelpPopupContent } from "@/components/organisms";

export type Step = "email-input" | "confirm-code" | "password-change";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("status");
  const { openPopup } = usePopup();

  const beforeLogin = location.state?.beforeLogin || "/";

  const [step, setStep] = useState<Step>("email-input");
  const [userEmail, setUserEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const confirmForm = useForm<VerificationCodeFormData>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: { code: "" },
  });

  const passwordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onEmailSubmit = async (data: ForgotPasswordFormData) => {
    const { error } = await resetPassword(data.email);
    if (error) {
      toast({ title: "Ошибка", description: t(`status:${error.code}`), variant: "destructive" });
      return;
    }
    setUserEmail(data.email);
    setStep("confirm-code");
    setResendTimer(60);
  };

  const onConfirmSubmit = async (data: VerificationCodeFormData) => {
    const { error } = await verifyOtp({ email: userEmail, code: data.code, type: "recovery" });
    if (error) {
      toast({ title: "Ошибка подтверждения", description: t(`status:${error.code}`), variant: "destructive" });
      return;
    }
    setStep("password-change");
  };

  const onPasswordSubmit = async (data: ResetPasswordFormData) => {
    const { error } = await updatePassword(data.password);
    if (error) {
      toast({ title: "Ошибка", description: t(`status:${error.code}`), variant: "destructive" });
      return;
    }
    toast({ title: "Пароль изменён", description: "Теперь вы можете войти с новым паролем" });
    await signOut();
    navigate("/login");
  };

  const handleResendCode = async () => {
    setIsResending(true);
    const { error } = await resetPassword(userEmail);
    if (error) {
      toast({ title: "Ошибка", description: t(`status:${error.code}`), variant: "destructive" });
    } else {
      setResendTimer(60);
      toast({ title: "Код отправлен", description: "Проверьте вашу почту" });
    }
    setIsResending(false);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleHelpClick = () => {
    openPopup(ConfirmCodeHelpPopupContent({ codeMode: "recovery" }));
  };

  const goToEmailInput = () => {
    confirmForm.reset();
    passwordForm.reset();
    setStep("email-input");
  };

  const handleCloseClick = () => navigate(beforeLogin, { replace: true });

  const navigateToLogin = () => navigate("/login", { state: location.state });

  return {
    step,
    userEmail,
    resendTimer,
    isResending,
    emailForm,
    confirmForm,
    passwordForm,
    handlers: {
      onEmailSubmit,
      onConfirmSubmit,
      onPasswordSubmit,
      handleResendCode,
      handleHelpClick,
      goToEmailInput,
      handleCloseClick,
      navigateToLogin,
    }
  };
};