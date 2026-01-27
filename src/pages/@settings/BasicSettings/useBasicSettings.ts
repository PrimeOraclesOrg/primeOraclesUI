import { useNavigate } from "react-router-dom";
import { SettingsTab } from "../types";
import { useForm } from "react-hook-form";
import { UpdateProfileFormData, updateProfileSchema } from "@/utils/validators/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialPlatform } from "@/types";
import { toast } from "@/hooks/useToast";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/store/usersApi";

export const useBasicSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: profile } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateMyProfileMutation();

  const onTabChange = (tab: SettingsTab) => navigate(`/settings/${tab}`);

  const getSocialLink = useCallback(
    (socialPlatform: SocialPlatform) => {
      return profile?.social_medias.filter((link) => link.type === socialPlatform)[0]?.link || "";
    },
    [profile]
  );

  const getDefaultValues = useCallback(
    (): UpdateProfileFormData => ({
      name: profile?.name || "",
      description: profile?.bio || "",
      instagramUrl: getSocialLink("instagram"),
      tiktokUrl: getSocialLink("tiktok"),
      youtubeUrl: getSocialLink("youtube"),
      selectedAvatar: "",
      uploadedAvatar: "",
    }),
    [profile, getSocialLink]
  );

  const updateProfileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: getDefaultValues(),
    mode: "onBlur",
  });

  const onUpdateProfileSubmit = async (data: UpdateProfileFormData) => {
    try {
      await updateProfile(data).unwrap();
      toast({
        title: "Успешно",
        description: "Профиль успешно сохранён",
      });
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: t(`status:${error.code}`) || error.message,
        variant: "destructive",
      });
    }
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
