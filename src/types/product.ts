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
