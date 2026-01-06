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

// ========================================
// Review & FAQ Models
// ========================================
export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface RatingDistributionItem {
  stars: number;
  percentage: number;
}
