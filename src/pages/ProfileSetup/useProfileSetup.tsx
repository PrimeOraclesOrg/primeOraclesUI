import { LogoutPopupContent } from "@/components/organisms";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";
import { completeProfile, signOut } from "@/services";
import { selectAuthIsFetching, selectAuthUser } from "@/store";
import { ProfileSetupFormData, profileSetupSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useProfileSetup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openPopup, closePopup } = usePopup();
  const isAuthFetching = useSelector(selectAuthIsFetching);
  const user = useSelector(selectAuthUser);

  const profileSetupForm = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      selectedAvatar: "1",
      description: "",
      instagramUrl: "",
      name: "",
      tiktokUrl: "",
      username: "",
      youtubeUrl: "",
    },
    mode: "onBlur",
  });

  const onProfileSetupSubmit = async (data: ProfileSetupFormData) => {
    const { error } = await completeProfile({
      name: data.name,
      username: data.username,
      description: data.description,
      youtubeUrl: data.youtubeUrl,
      instagramUrl: data.instagramUrl,
      tiktokUrl: data.tiktokUrl,
      selectedAvatar: data.selectedAvatar,
      uploadedAvatar: data.uploadedAvatar,
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
        description: "Профиль успешно сохранён",
      });
      navigate("/", { replace: true });
    }
  };

  const logout = async () => {
    await signOut();
    closePopup();
    navigate("/");
  };

  const onLogout = () => openPopup(<LogoutPopupContent logout={logout} />);

  useEffect(() => {
    if (!isAuthFetching && !user) navigate("/");
  }, [isAuthFetching, user, navigate]);

  return {
    profileSetupForm,
    onProfileSetupSubmit,
    onLogout,
  };
};
