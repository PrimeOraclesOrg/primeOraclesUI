import type { Product, Reward, LearningItem, LessonDetails } from "./models";

// ========================================
// Products API Types
// ========================================
export interface ProductsQueryArgs {
  category?: string;
  searchQuery?: string;
}

export interface ProductsResponse {
  products: Product[];
  categories: string[];
}

// ========================================
// Rewards API Types
// ========================================
export interface RewardsResponse {
  rewards: Reward[];
}

export interface HomeRewardsResponse {
  featuredRewards: Reward[];
  bottomRewards: Reward[];
  sideReward: Reward | null;
}

// ========================================
// Learning API Types
// ========================================
export interface LearningQueryArgs {
  tab?: string;
}

export interface LearningResponse {
  items: LearningItem[];
  tabs: string[];
}

export interface LessonDetailsResponse {
  lesson: LessonDetails;
}
