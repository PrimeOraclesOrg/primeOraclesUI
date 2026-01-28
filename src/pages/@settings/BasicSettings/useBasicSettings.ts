import { useNavigate } from "react-router-dom";
import { SettingsTab } from "../types";
import { useForm } from "react-hook-form";
import { UpdateProfileFormData, updateProfileSchema } from "@/utils/validators/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/store/usersApi";
import { getSocialLink } from "@/utils";
import { useOnRequestResult } from "@/hooks/useOnRequestResult";

export const useBasicSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: profile } = useGetMyProfileQuery();
  const [updateProfile, { isError, isSuccess, error }] = useUpdateMyProfileMutation();

  useOnRequestResult({
    isError,
    isSuccess,
    errorMessage: {
      title: "Ошибка сохранения",
      description: error ? t(`status:${error.code}`) : "",
    },
    successMessage: {
      title: "Успешно",
      description: "Профиль успешно сохранён",
    },
  });

  const onTabChange = (tab: SettingsTab) => navigate(`/settings/${tab}`);

  const getDefaultValues = useCallback(
    (): UpdateProfileFormData => ({
      name: profile?.name || "",
      description: profile?.bio || "",
      instagramUrl: getSocialLink("instagram", profile),
      tiktokUrl: getSocialLink("tiktok", profile),
      youtubeUrl: getSocialLink("youtube", profile),
      selectedAvatar: "",
      uploadedAvatar: "",
    }),
    [profile]
  );

  const updateProfileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: getDefaultValues(),
    mode: "onBlur",
  });

  const onUpdateProfileSubmit = async (data: UpdateProfileFormData) => {
    await updateProfile(data);
  };

  useEffect(() => {
    updateProfileForm.reset(getDefaultValues());
  }, [profile, updateProfileForm, getDefaultValues]);

  return {
    onTabChange,
    updateProfileForm,
    onUpdateProfileSubmit,
  };
};
