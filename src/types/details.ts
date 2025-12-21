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
}

export interface LessonDetails {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  videoDescription: string[];
  articleContent: string;
}
