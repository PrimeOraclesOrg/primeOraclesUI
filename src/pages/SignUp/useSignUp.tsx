import { ConfirmCodeHelpPopupContent } from "@/components/organisms";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { resendSignUpOtp, signOut, signUp, verifyOtp } from "@/services";
import {
  RegisterFormData,
  registerSchema,
  VerificationCodeFormData,
  verificationCodeSchema,
} from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type Step = "sign-up" | "confirm-code";

export const useSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("status");
  const { openPopup } = usePopup();

  const beforeLogin = location.state?.beforeLogin || "/";

  const [step, setStep] = useState<Step>("sign-up");
  const [userEmail, setUserEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const registerFormForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const verificationCodeForm = useForm<VerificationCodeFormData>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: { code: "" },
  });

  const onSignUpSubmit = async (data: RegisterFormData) => {
    const { error } = await signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast({
        title: "Ошибка регистрации",
        description: t(`status:${error.code}`),
        variant: "destructive",
      });
      return;
    }

    setUserEmail(data.email);
    setStep("confirm-code");
    setResendTimer(60);
  };

  const onConfirmSubmit = async (data: VerificationCodeFormData) => {
    const { error } = await verifyOtp({
      email: userEmail,
      code: data.code,
      type: "signup",
    });

    if (error) {
      toast({
        title: "Ошибка подтверждения",
        description: t(`status:${error.code}`),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успешно",
      description: "Регистрация завершена. Теперь вы можете войти в свой аккаунт",
    });

    await signOut();
    navigate("/login", { state: location.state });
  };

  const handleResendCode = async () => {
    setIsResending(true);
    const { error } = await resendSignUpOtp(userEmail);

    if (error) {
      toast({
        title: "Ошибка",
        description: t(`status:${error.code}`),
        variant: "destructive",
      });
    } else {
      setResendTimer(60);
      toast({
        title: "Код отправлен",
        description: "Проверьте вашу почту",
      });
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
    openPopup(<ConfirmCodeHelpPopupContent codeMode="sign-up" />);
  };

  const onBackToSignUp = () => {
    confirmForm.reset();
    setStep("sign-up");
  };

  const handleCloseClick = () => navigate(beforeLogin, { replace: true });

  const navigateWithState = (to: string) => {
    navigate(to, { state: location.state });
  };

  return {
    step,
    handleCloseClick,
    signUpForm,
    onSignUpSubmit,
    navigateWithState,
    confirmForm,
    userEmail,
    onConfirmSubmit,
    isResending,
    resendTimer,
    handleResendCode,
    handleHelpClick,
    onBackToSignUp,
  };
};
