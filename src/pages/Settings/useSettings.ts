import { signOut } from "@/services";
import { selectAuthProfile, useAppSelector } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { SettingsTab } from "./types";
import { useForm } from "react-hook-form";
import { UpdateProfileFormData, updateProfileSchema } from "@/utils/validators/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialPlatform } from "@/types";

export const useSettings = () => {
  const { tab } = useParams();
  const profile = useAppSelector(selectAuthProfile);

  const navigate = useNavigate();

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

  const onUpdateProfileSubmit = (data: UpdateProfileFormData) => {};

  return {
    profile,
    tab,
    onTabChange,
    onLogout,
    updateProfileForm,
    onUpdateProfileSubmit,
  };
};
