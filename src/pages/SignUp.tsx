import { ConfirmCodeHelpPopupContent } from "@/components/organisms";
import { ConfirmCodeTemplate, SignUpTemplate } from "@/components/templates";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { resendSignUpOtp, signOut, signUp, verifyOtp } from "@/services";
import { registerSchema, verificationCodeSchema } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  confirmCode?: string;
}

type Step = "sign-up" | "confirm-code" | "profile-setup";

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openPopup } = usePopup();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [step, setStep] = useState<Step>("sign-up");

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = registerSchema.safeParse({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (!result.success) {
        const fieldErrors: Errors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof Errors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signUp({
          email: email,
          password: password,
        });
        if (error) {
          toast({
            title: "Ошибка регистрации",
            description: t(`status:${error.code}`),
            variant: "destructive",
          });
        } else {
          setStep("confirm-code");
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
    [email, t, confirmPassword, password]
  );

  const handleConfirmCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = verificationCodeSchema.safeParse(code);

      if (!result.success) {
        setErrors({ confirmCode: result.error.errors[0]?.message });
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await verifyOtp({ email, code, type: "signup" });

        if (error) {
          toast({
            title: "Ошибка подтверждения",
            description: t(`status:${error.code}`),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Успешно",
            description: "Регистрация завершена. Теперь вы можете войти в свой аккаунт",
          });
          await signOut();
          navigate("/login");
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
    [email, code, t, navigate]
  );

  const handleResendCode = useCallback(async () => {
    setIsResending(true);
    const { error } = await resendSignUpOtp(email);
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

  const onBack = () => {
    setPassword("");
    setConfirmPassword("");
    setCode("");
    setStep("sign-up");
  };

  const handleHelpClick = () => {
    openPopup(<ConfirmCodeHelpPopupContent codeMode="sign-up" />);
  };

  return (
    <>
      {step === "sign-up" && (
        <SignUpTemplate
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errors={errors}
          isLoading={isLoading}
          onBack={() => navigate("/login")}
          onSignUp={handleSignUp}
        />
      )}

      {step === "confirm-code" && (
        <ConfirmCodeTemplate
          email={email}
          code={code}
          setCode={setCode}
          codeMode="signup"
          error={errors.confirmCode}
          isLoading={isLoading}
          isResending={isResending}
          onBack={onBack}
          onConfirmCode={handleConfirmCode}
          onHelpClick={handleHelpClick}
          onResendCode={handleResendCode}
          resendTimer={resendTimer}
        />
      )}
    </>
  );
}
