import { ConfirmCodeHelpPopupContent } from "@/components/organisms";
import { ConfirmCodeTemplate, SignUpTemplate } from "@/components/templates";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { resendSignUpOtp, signOut, signUp, verifyOtp } from "@/services";
import {
  RegisterFormData,
  registerSchema,
  VerificationCodeFormData,
  verificationCodeSchema,
} from "@/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Step = "sign-up" | "confirm-code";

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation("status");
  const { openPopup } = usePopup();

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
    navigate("/login");
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

  return (
    <>
      {step === "sign-up" && (
        <SignUpTemplate
          register={signUpForm.register}
          onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
          errors={signUpForm.formState.errors}
          isSubmitting={signUpForm.formState.isSubmitting}
          onBack={() => navigate("/login")}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          onReset={() => confirmForm.reset()}
          email={userEmail}
          control={confirmForm.control}
          onSubmit={confirmForm.handleSubmit(onConfirmSubmit)}
          errors={confirmForm.formState.errors}
          isSubmitting={confirmForm.formState.isSubmitting}
          isResending={isResending}
          resendTimer={resendTimer}
          onResendCode={handleResendCode}
          onHelpClick={handleHelpClick}
          onBack={onBackToSignUp}
          codeMode="signup"
        />
      )}
    </>
  );
}
