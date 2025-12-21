export type SocialNetwork = "instagram" | "youtube" | "tiktok" | "vk" | "x";

export interface Reward {
  logo: string;
  name: string;
  rate: string;
  description: string;
  paidAmount: string;
  totalAmount: string;
  progress: number;
  category: string;
  type: string;
  views: string;
  socialNetworks: SocialNetwork[];
}
