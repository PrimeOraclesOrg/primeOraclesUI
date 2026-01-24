import { LoginTemplate } from "@/components/templates";
import { toast } from "@/hooks/useToast";
import { getUserProfile, signIn } from "@/services";
import { LoginFormData, loginSchema } from "@/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { setProfile } from "@/store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("status");
  const dispatch = useAppDispatch();

  const afterLogin = location.state?.afterLogin || "/";
  const beforeLogin = location.state?.beforeLogin || "/";

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await signIn(data);

    if (error) {
      toast({
        title: "Ошибка входа",
        description: t(`status:${error.code}`),
        variant: "destructive",
      });
      return;
    }

    const { data: profile } = await getUserProfile();
    dispatch(setProfile(profile));

    navigate(afterLogin);
  };

  const navigateWithState = (to: string) => {
    navigate(to, { state: location.state, replace: true });
  };

  return (
    <LoginTemplate
      register={loginForm.register}
      onSubmit={loginForm.handleSubmit(onSubmit)}
      errors={loginForm.formState.errors}
      isSubmitting={loginForm.formState.isSubmitting}
      toForgotPassword={() => navigateWithState("/reset-password")}
      toSignUp={() => navigateWithState("/sign-up")}
      onClose={() => navigate(beforeLogin, { replace: true })}
    />
  );
}
