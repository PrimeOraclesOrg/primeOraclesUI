import { ConfirmCodeHelpPopupContent } from "@/components/organisms";
import {
  ConfirmCodeTemplate,
  ForgotPasswordTemplate,
  ResetPasswordTemplate,
} from "@/components/templates";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { resetPassword, signOut, updatePassword, verifyOtp } from "@/services";
import { forgotPasswordSchema, resetPasswordSchema, verificationCodeSchema } from "@/utils";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Step = "email-input" | "confirm-code" | "password-change";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  confirmCode?: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openPopup } = usePopup();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("email-input");

  const handleForgotPassword = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setErrors({});

      const result = forgotPasswordSchema.safeParse({ email: email });

      if (!result.success) {
        setErrors({ email: result.error.errors[0]?.message });
        return;
      }

      setIsLoading(true);
      const { error } = await resetPassword(email);
      if (error) {
        toast({
          title: "Ошибка",
          description: t(`status:${error.code}`),
          variant: "destructive",
        });
      } else {
        setStep("confirm-code");
      }
      setIsLoading(false);
    },
    [email, t]
  );

  const handleConfirmCode = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setErrors({});

      const result = verificationCodeSchema.safeParse(code);

      if (!result.success) {
        setErrors({ confirmCode: result.error.errors[0]?.message });
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await verifyOtp({ email, code, type: "recovery" });

        if (error) {
          toast({
            title: "Ошибка подтверждения",
            description: t(`status:${error.code}`),
            variant: "destructive",
          });
        } else {
          setStep("password-change");
        }
      } catch {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка. Попробуйте позже.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [email, code, t]
  );

  const handleResendCode = useCallback(async () => {
    setIsResending(true);
    const { error } = await resetPassword(email);
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
  }, [email, t]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleHelpClick = () => {
    openPopup(<ConfirmCodeHelpPopupContent codeMode="recovery" />);
  };

  const handleChangePassword = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setErrors({});

      const result = resetPasswordSchema.safeParse({
        password,
        confirmPassword,
      });

      if (!result.success) {
        const fieldErrors: Errors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (field === "password") fieldErrors.password = err.message;
          if (field === "confirmPassword") fieldErrors.confirmPassword = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      const { error } = await updatePassword(password);
      if (error) {
        toast({
          title: "Ошибка",
          description: t(`status:${error.code}`),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Пароль изменён",
          description: "Теперь вы можете войти с новым паролем",
        });
        await signOut();
        navigate("/login");
      }
      setIsLoading(false);
    },
    [password, confirmPassword, t, navigate]
  );

  function goToEmailInput() {
    setPassword("");
    setConfirmPassword("");
    setCode("");
    setStep("email-input");
  }

  return (
    <>
      {step === "email-input" && (
        <ForgotPasswordTemplate
          email={email}
          setEmail={setEmail}
          error={errors.email}
          isLoading={isLoading}
          onForgotPassword={handleForgotPassword}
          onBack={() => navigate("/login")}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          code={code}
          codeMode="recovery"
          email={email}
          error={errors.confirmCode}
          isLoading={isLoading}
          isResending={isResending}
          onBack={goToEmailInput}
          onConfirmCode={handleConfirmCode}
          onHelpClick={handleHelpClick}
          onResendCode={handleResendCode}
          resendTimer={resendTimer}
          setCode={setCode}
        />
      )}

      {step === "password-change" && (
        <ResetPasswordTemplate
          onBack={goToEmailInput}
          errors={errors}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          onChangePassword={handleChangePassword}
        />
      )}
    </>
  );
}
