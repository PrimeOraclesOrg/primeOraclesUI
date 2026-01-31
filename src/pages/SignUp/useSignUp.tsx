import { ConfirmCodeHelpPopupContent } from "@/components/organisms";
import { useOnRequestResult } from "@/hooks/useOnRequestResult";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { resendSignUpOtp, signUp } from "@/services";
import { useVerifyOtpMutation } from "@/store/authApi";
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
  const [verifyOtp, { isError, isSuccess, error }] = useVerifyOtpMutation();

  useOnRequestResult({
    isError,
    isSuccess,
    successMessage: {
      description: "Успешная регистрация. Теперь заполните ваш профиль",
    },
    errorMessage: {
      title: "Ошибка подтверждения",
      description: error ? t(`status:${error.code}`) : "",
    },
  });

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
    await verifyOtp({
      email: userEmail,
      code: data.code,
      type: "signup",
    });
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
    verificationCodeForm.reset();
    setStep("sign-up");
  };

  const handleCloseClick = () => navigate(beforeLogin, { replace: true });

  const navigateWithState = (to: string) => {
    navigate(to, { state: location.state, replace: true });
  };

  return {
    step,
    handleCloseClick,
    registerFormForm,
    onSignUpSubmit,
    navigateWithState,
    verificationCodeForm,
    userEmail,
    onConfirmSubmit,
    isResending,
    resendTimer,
    handleResendCode,
    handleHelpClick,
    onBackToSignUp,
  };
};
