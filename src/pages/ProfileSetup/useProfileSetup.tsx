import { LogoutPopupContent } from "@/components/organisms";
import { usePopup } from "@/hooks/usePopup";
import { toast } from "@/hooks/useToast";

import {
  useCompleteProfileMutation,
  useGetAuthUserQuery,
  useLogoutMutation,
} from "@/store/authApi";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { ProfileSetupFormData, profileSetupSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useProfileSetup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openPopup, closePopup } = usePopup();
  const { data: profile } = useGetMyProfileQuery();
  const { data: user, isLoading: isAuthLoading } = useGetAuthUserQuery();
  const [logout] = useLogoutMutation();
  const [completeProfile] = useCompleteProfileMutation();

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
    try {
      await completeProfile({
        name: data.name,
        username: data.username,
        description: data.description,
        youtubeUrl: data.youtubeUrl,
        instagramUrl: data.instagramUrl,
        tiktokUrl: data.tiktokUrl,
        selectedAvatar: data.selectedAvatar,
        uploadedAvatar: data.uploadedAvatar,
      }).unwrap();

      toast({
        title: "Успешно",
        description: "Профиль успешно сохранён",
      });
      navigate("/", { replace: true });
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: t(`status:${error.code}`) || error.message,
        variant: "destructive",
      });
    }
  };

  const logoutProcess = useCallback(async () => {
    await logout();
    closePopup();
    navigate("/");
  }, [closePopup, navigate, logout]);

  const onLogout = useCallback(
    () => openPopup(<LogoutPopupContent logout={logoutProcess} />),
    [openPopup, logoutProcess]
  );

  useEffect(() => {
    if ((!isAuthLoading && !user) || profile?.is_profile_completed) {
      return navigate("/");
    }
  }, [user, navigate, profile, isAuthLoading]);

  return {
    profileSetupForm,
    onProfileSetupSubmit,
    onLogout,
  };
};
