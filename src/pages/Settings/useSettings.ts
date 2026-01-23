import { signOut, updateProfile } from "@/services";
import { selectAuthProfile, useAppDispatch, useAppSelector } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { SettingsTab } from "./types";
import { useForm } from "react-hook-form";
import { UpdateProfileFormData, updateProfileSchema } from "@/utils/validators/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialPlatform } from "@/types";
import { toast } from "@/hooks/useToast";
import { useTranslation } from "react-i18next";
import { setProfile } from "@/store/authSlice";

export const useSettings = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = useAppSelector(selectAuthProfile);
  const dispatch = useAppDispatch();

  const onTabChange = (tab: SettingsTab) => navigate(`/settings/${tab}`);

  const onLogout = async () => {
    await signOut();
    navigate("/");
  };

  const getSocialLink = (socialPlatform: SocialPlatform) => {
    return profile?.social_medias.filter((link) => link.type === socialPlatform)[0]?.link || "";
  };

  const updateProfileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name,
      description: profile?.bio,
      instagramUrl: getSocialLink("instagram"),
      tiktokUrl: getSocialLink("tiktok"),
      youtubeUrl: getSocialLink("youtube"),
    },
    mode: "onBlur",
  });

  const onUpdateProfileSubmit = async (data: UpdateProfileFormData) => {
    const { data: profile, error } = await updateProfile(data);

    if (error) {
      toast({
        title: "Ошибка сохранения",
        description: t(`status:${error.code}`) || error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успешно",
      description: "Профиль успешно сохранён",
    });

    dispatch(setProfile(profile));
  };

  return {
    profile,
    tab,
    onTabChange,
    onLogout,
    updateProfileForm,
    onUpdateProfileSubmit,
  };
};
