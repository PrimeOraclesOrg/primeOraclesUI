import { LogoutPopupContent } from "@/components/organisms";
import { useOnRequestResult } from "@/hooks/useOnRequestResult";
import { usePopup } from "@/hooks/usePopup";

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
  const [completeProfile, { isError, isSuccess, error }] = useCompleteProfileMutation();
  const [logout, { isError: isLogoutError, isSuccess: isLogoutSuccess, error: logoutError }] =
    useLogoutMutation();

  useOnRequestResult({
    isError,
    isSuccess,
    successMessage: "Профиль успешно сохранён",
    errorMessage: {
      title: "Ошибка сохранения",
      description: error ? t(`status:${error?.code}`) : "",
    },
    onSuccess: () => navigate("/", { replace: true }),
  });

  useOnRequestResult({
    isError: isLogoutError,
    isSuccess: isLogoutSuccess,
    errorMessage: logoutError ? t(`status:${logoutError.code}`) : "",
    onSuccess: () => {
      closePopup();
      navigate("/");
    },
  });

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
    await completeProfile({
      name: data.name,
      username: data.username,
      description: data.description,
      youtubeUrl: data.youtubeUrl,
      instagramUrl: data.instagramUrl,
      tiktokUrl: data.tiktokUrl,
      selectedAvatar: data.selectedAvatar,
      uploadedAvatar: data.uploadedAvatar,
    });
  };

  const onLogout = useCallback(
    () => openPopup(<LogoutPopupContent logout={logout} />),
    [openPopup, logout]
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
