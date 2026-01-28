import { FullProfile, SocialMediaType } from "@/types";

export const getSocialLink = (socialPlatform: SocialMediaType, profile: FullProfile) => {
  return profile?.social_medias.filter((link) => link.type === socialPlatform)[0]?.link || "";
};
