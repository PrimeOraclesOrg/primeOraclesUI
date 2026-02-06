import type { Review, FAQ, RatingDistributionItem, ProductDetails, LessonDetails } from "@/types";
import productCrypto from "@/assets/product-crypto.jpg";
import learningIntro from "@/assets/learning-intro.jpg";

export const mockReviews: Review[] = [
  {
    author_id: "1",
    author_name: "Михаил Грибенюк",
    rating: 5,
    comment:
      "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    created_at: new Date().toISOString(),
    total_pages: 1,
    author_avatar: "",
    author_username: "",
  },
  {
    author_id: "2",
    author_name: "Михаил Грибенюк",
    rating: 5,
    comment:
      "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    created_at: new Date().toISOString(),
    total_pages: 1,
    author_avatar: "",
    author_username: "",
  },
  {
    author_id: "3",
    author_name: "Михаил Грибенюк",
    rating: 5,
    comment:
      "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    created_at: new Date().toISOString(),
    total_pages: 1,
    author_avatar: "",
    author_username: "",
  },
];

export const productFaqs: FAQ[] = [
  { position: 1, question: "Вопрос 1", answer: "Ответ на первый вопрос будет здесь." },
  { position: 2, question: "Вопрос 2", answer: "Ответ на второй вопрос будет здесь." },
  { position: 3, question: "Вопрос 3", answer: "Ответ на третий вопрос будет здесь." },
];

export const ratingDistribution: RatingDistributionItem[] = [
  { stars: 5, count: 85 },
  { stars: 4, count: 10 },
  { stars: 3, count: 3 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

export const getProductDetails = (id: string): ProductDetails => ({
  id,
  title: "Закрытый клуб предпринимателей",
  subtitle: "Феномен КОФЕМАНИИ",
  description: "Описание продукта будет здесь.",
  image: productCrypto,
  price: 100,
  author: { name: "Михаил Грибенюк", avatar: undefined },
  rating: 4.67,
  reviewCount: 51,
  memberCount: 271,
  features: [
    { id: "1", text: "Особенность 1" },
    { id: "2", text: "Особенность 2" },
    { id: "3", text: "Особенность 3" },
  ],
});

export const getLessonDetails = (id: string): LessonDetails => ({
  id,
  title: "Что такое Prime Oracles",
  subtitle: "Как работает платформа и на чем строится заработок",
  image: learningIntro,
  videoDescription: [
    "Как устроена площадка Prime Oracles",
    "На чем мы зарабатываем",
    "Бла бла бла Блэ блэ блэ",
  ],
  articleContent: "Пересказ видео в тексте. Здесь будет полный текст статьи.",
});
