import { toast } from "@/hooks/useToast";
import { completeProfile, signOut } from "@/services";
import { ProfileSetupFormData, profileSetupSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const useProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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

  return {
    profileSetupForm,
    onProfileSetupSubmit,
  };
};
