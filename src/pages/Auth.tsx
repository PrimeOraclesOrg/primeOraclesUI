/**
 * Auth Page
 *
 * Unified authentication page with single-page flow.
 * Handles: login, register, forgot password, confirm code, reset password
 * All steps are managed within this single page without routing.
 */

import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginTemplate } from "@/components/templates/LoginTemplate/LoginTemplate";
import { RegisterTemplate } from "@/components/templates/RegisterTemplate/RegisterTemplate";
import { ForgotPasswordTemplate } from "@/components/templates/ForgotPasswordTemplate/ForgotPasswordTemplate";
import { ConfirmCodeTemplate } from "@/components/templates/ConfirmCodeTemplate/ConfirmCodeTemplate";
import { ResetPasswordTemplate } from "@/components/templates/ResetPasswordTemplate/ResetPasswordTemplate";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verificationCodeSchema,
  resetPasswordSchema,
} from "@/utils/validators";
import { signIn, signUp, resetPassword } from "@/services/authService";
import { toast } from "@/hooks/useToast";

type AuthStep =
  | "login"
  | "register"
  | "forgot-password"
  | "confirm-code"
  | "reset-password";

interface AuthState {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
  newPassword: string;
  newConfirmPassword: string;
}

interface AuthErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
  newPassword?: string;
  newConfirmPassword?: string;
}

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial step from route
  const getInitialStep = (): AuthStep => {
    const path = location.pathname;
    if (path === "/register") return "register";
    if (path === "/forgot-password") return "forgot-password";
    if (path === "/confirm-code") return "confirm-code";
    if (path === "/reset-password") return "reset-password";
    return "login";
  };

  const [step, setStep] = useState<AuthStep>(getInitialStep);
  const [codeMode, setCodeMode] = useState<"register" | "reset">("register");
  const [state, setState] = useState<AuthState>({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
    newPassword: "",
    newConfirmPassword: "",
  });
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Handle resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Update field value
  const updateField = useCallback(
    <K extends keyof AuthState>(field: K, value: AuthState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  // Navigate to step
  const goToStep = useCallback((newStep: AuthStep) => {
    setErrors({});
    setStep(newStep);
  }, []);

  // Handle login submit
  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = loginSchema.safeParse({
        email: state.email,
        password: state.password,
      });

      if (!result.success) {
        const fieldErrors: AuthErrors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof AuthErrors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signIn({
          email: state.email,
          password: state.password,
        });
        if (error) {
          toast({
            title: "Ошибка входа",
            description: "Неверный email или пароль",
            variant: "destructive",
          });
        } else {
          navigate("/");
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
    [state.email, state.password, navigate]
  );

  // Handle register submit
  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = registerSchema.safeParse({
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      });

      if (!result.success) {
        const fieldErrors: AuthErrors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof AuthErrors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await signUp({
          email: state.email,
          password: state.password,
        });
        if (error) {
          toast({
            title: "Ошибка регистрации",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setCodeMode("register");
          setResendTimer(60);
          goToStep("confirm-code");
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
    [state.email, state.password, state.confirmPassword, goToStep]
  );

  // Handle forgot password submit
  const handleForgotPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = forgotPasswordSchema.safeParse({ email: state.email });

      if (!result.success) {
        setErrors({ email: result.error.errors[0]?.message });
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await resetPassword(state.email);
        if (error) {
          toast({
            title: "Ошибка",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setCodeMode("reset");
          setResendTimer(60);
          goToStep("confirm-code");
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
    [state.email, goToStep]
  );

  // Handle code confirmation
  const handleConfirmCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = verificationCodeSchema.safeParse({ code: state.code });

      if (!result.success) {
        setErrors({ code: result.error.errors[0]?.message });
        return;
      }

      setIsLoading(true);
      try {
        // Simulate code verification
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock verification - in real app, call API
        if (state.code === "12345678") {
          if (codeMode === "register") {
            toast({
              title: "Успешно",
              description: "Регистрация завершена",
            });
            navigate("/");
          } else {
            goToStep("reset-password");
          }
        } else {
          setErrors({ code: "Неверный код. Попробуйте снова." });
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
    [state.code, codeMode, navigate, goToStep]
  );

  // Handle resend code
  const handleResendCode = useCallback(async () => {
    setIsResending(true);
    try {
      // Simulate resend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendTimer(60);
      toast({
        title: "Код отправлен",
        description: "Проверьте вашу почту",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить код",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  }, []);

  // Handle reset password
  const handleResetPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const result = resetPasswordSchema.safeParse({
        password: state.newPassword,
        confirmPassword: state.newConfirmPassword,
      });

      if (!result.success) {
        const fieldErrors: AuthErrors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (field === "password") fieldErrors.newPassword = err.message;
          if (field === "confirmPassword")
            fieldErrors.newConfirmPassword = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate password reset
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({
          title: "Пароль изменён",
          description: "Теперь вы можете войти с новым паролем",
        });
        // Reset state and go to login
        setState({
          email: "",
          password: "",
          confirmPassword: "",
          code: "",
          newPassword: "",
          newConfirmPassword: "",
        });
        goToStep("login");
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
    [state.newPassword, state.newConfirmPassword, goToStep]
  );

  // Render based on current step
  switch (step) {
    case "register":
      return (
        <RegisterTemplate
          email={state.email}
          password={state.password}
          confirmPassword={state.confirmPassword}
          errors={{
            email: errors.email,
            password: errors.password,
            confirmPassword: errors.confirmPassword,
          }}
          isLoading={isLoading}
          onEmailChange={(v) => updateField("email", v)}
          onPasswordChange={(v) => updateField("password", v)}
          onConfirmPasswordChange={(v) => updateField("confirmPassword", v)}
          onSubmit={handleRegister}
          onBack={() => goToStep("login")}
        />
      );

    case "forgot-password":
      return (
        <ForgotPasswordTemplate
          email={state.email}
          error={errors.email}
          isLoading={isLoading}
          onEmailChange={(v) => updateField("email", v)}
          onSubmit={handleForgotPassword}
          onBack={() => goToStep("login")}
        />
      );

    case "confirm-code":
      return (
        <ConfirmCodeTemplate
          email={state.email}
          code={state.code}
          error={errors.code}
          isLoading={isLoading}
          isResending={isResending}
          resendTimer={resendTimer}
          mode={codeMode}
          onCodeChange={(v) => updateField("code", v)}
          onSubmit={handleConfirmCode}
          onResend={handleResendCode}
          onBack={() =>
            goToStep(codeMode === "register" ? "register" : "forgot-password")
          }
        />
      );

    case "reset-password":
      return (
        <ResetPasswordTemplate
          password={state.newPassword}
          confirmPassword={state.newConfirmPassword}
          errors={{
            password: errors.newPassword,
            confirmPassword: errors.newConfirmPassword,
          }}
          isLoading={isLoading}
          onPasswordChange={(v) => updateField("newPassword", v)}
          onConfirmPasswordChange={(v) => updateField("newConfirmPassword", v)}
          onSubmit={handleResetPassword}
          onBack={() => goToStep("login")}
        />
      );

    default:
      return (
        <LoginTemplate
          email={state.email}
          password={state.password}
          errors={{
            email: errors.email,
            password: errors.password,
          }}
          isLoading={isLoading}
          onEmailChange={(v) => updateField("email", v)}
          onPasswordChange={(v) => updateField("password", v)}
          onSubmit={handleLogin}
          onForgotPassword={() => goToStep("forgot-password")}
          onSignUp={() => goToStep("register")}
        />
      );
  }
}
