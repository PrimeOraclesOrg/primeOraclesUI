import { ConfirmCodeHelpPopupContent } from "@/components/organisms";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { completeProfile, resendSignUpOtp, signOut, signUp, verifyOtp } from "@/services";
import {
  ProfileSetupFormData,
  profileSetupSchema,
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

type Step = "sign-up" | "confirm-code" | "profile-setup";

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

  const signUpForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const confirmForm = useForm<VerificationCodeFormData>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: { code: "" },
  });

  const profileSetupForm = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      avatar: "",
      description: "",
      instagramUrl: "",
      name: "",
      tiktokUrl: "",
      username: "",
      youtubeUrl: "",
    },
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
      description: "Успешная регистрация. Теперь заполните ваш профиль",
    });

    setStep("profile-setup");
  };

  const onProfileSetupSubmit = async (data: ProfileSetupFormData) => {
    const { error } = await completeProfile({
      name: data.name,
      username: data.username,
      description: data.description,
      youtubeUrl: data.youtubeUrl,
      instagramUrl: data.instagramUrl,
      tiktokUrl: data.tiktokUrl,
      avatar: data.avatar,
    });

    if (error) {
      toast({
        title: "Ошибка сохранения",
        description: t(`status:${error.code}`) || error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Успешно",
        description: "Профиль успешно сохранён, теперь можете войти",
      });
      await signOut();
      navigate("/login", { state: location.state, replace: true });
    }
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
    navigate(to, { state: location.state, replace: true });
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
    profileSetupForm,
    onProfileSetupSubmit,
    isResending,
    resendTimer,
    handleResendCode,
    handleHelpClick,
    onBackToSignUp,
  };
};
