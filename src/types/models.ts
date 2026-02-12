import { Database } from "./supabase";
// ========================================
// Product Models

// ========================================
export interface Product {
  id: string;
  title: string;
  description?: string;
  image: string;
  price: number | "free";
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  reviewCount: number;
  category: string;
}

export interface ProductDetails {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  reviewCount: number;
  memberCount: number;
  features: {
    id: string;
    text: string;
  }[];
}

// ========================================
// Reward Models
// ========================================
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
  socialNetworks: SocialMediaType[];
}

// ========================================
// Learning Models
// ========================================
export interface LearningItem {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  tab: string;
}

export interface LessonDetails {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  videoDescription: string[];
  articleContent: string;
}

// ========================================
// Transaction Models
// ========================================
export type TransactionStatus = "pending" | "deposit" | "withdrawn";

export interface Transaction {
  id: string;
  amount: number;
  status: TransactionStatus;
  method: string;
  address: string;
}

export type OrderStatus = "completed" | "pending" | "purchased";

export interface Order {
  id: string;
  title: string;
  status: OrderStatus;
  type: string;
  amount: number;
}

// ========================================
// User Models
// ========================================
export type SocialMediaType = Database["public"]["Enums"]["social_media_type"];

export interface SocialMedia {
  type: SocialMediaType;
  link: string;
}

// ========================================
// Review & FAQ Models
// ========================================

export interface RatingDistributionItem {
  stars: number;
  count: number;
}

export type MyProducts = Database["public"]["Functions"]["app_get_my_products"]["Returns"];
export type FullProfile = Omit<
  Database["public"]["Views"]["public_profiles_full_view"]["Row"],
  "social_medias"
> & {
  social_medias: SocialMedia[];
};
