import { LoginTemplate } from "@/components/templates";
import { toast } from "@/hooks/useToast";
import { signIn } from "@/services";
import { LoginFormData, loginSchema } from "@/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation("status");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
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

    navigate("/");
  };

  return (
    <LoginTemplate
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isSubmitting={isSubmitting}
      toForgotPassword={() => navigate("/reset-password")}
      toSignUp={() => navigate("/sign-up")}
      onClose={() => navigate("/")}
    />
  );
}
