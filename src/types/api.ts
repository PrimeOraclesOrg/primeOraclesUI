import type {
  Product,
  ProductDetails,
  Reward,
  LearningItem,
  LessonDetails,
  Review,
  RatingDistributionItem,
} from "./models";
import { FAQ } from "./products";

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

export interface ProductDetailsResponse {
  product: ProductDetails;
  reviews: Review[];
  faqs: FAQ[];
  ratingDistribution: RatingDistributionItem[];
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
