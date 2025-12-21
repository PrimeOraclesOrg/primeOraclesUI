export type SocialPlatform = "youtube" | "instagram" | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  icon: string;
  color: string;
}

export interface UserProfile {
  name: string;
  username: string;
  avatar?: string;
  description?: string;
  socialLinks: SocialLink[];
}
