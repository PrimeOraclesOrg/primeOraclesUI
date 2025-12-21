import type { Review, FAQ, RatingDistributionItem, ProductDetails, LessonDetails } from "@/types/details";
import productCrypto from "@/assets/product-crypto.jpg";
import learningIntro from "@/assets/learning-intro.jpg";

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Михаил Грибенюк",
    rating: 5,
    text: "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    date: "1 День назад",
  },
  {
    id: "2",
    author: "Михаил Грибенюк",
    rating: 5,
    text: "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    date: "1 День назад",
  },
  {
    id: "3",
    author: "Михаил Грибенюк",
    rating: 5,
    text: "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    date: "1 День назад",
  },
];

export const productFaqs: FAQ[] = [
  { id: "1", question: "Вопрос 1", answer: "Ответ на первый вопрос будет здесь." },
  { id: "2", question: "Вопрос 2", answer: "Ответ на второй вопрос будет здесь." },
  { id: "3", question: "Вопрос 3", answer: "Ответ на третий вопрос будет здесь." },
];

export const ratingDistribution: RatingDistributionItem[] = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export const getProductDetails = (id: string): ProductDetails => ({
  id,
  title: "Закрытый клуб предпринимателей",
  subtitle: "Феномен КОФЕМАНИИ",
  description: "Описание продукта будет здесь. Это подробная информация о том, что входит в данный продукт и какие преимущества вы получите при покупке.",
  image: productCrypto,
  price: 100,
  author: {
    name: "Михаил Грибенюк",
    avatar: undefined,
  },
  rating: 4.67,
  reviewCount: 51,
  memberCount: 271,
});

export const getLessonDetails = (id: string): LessonDetails => ({
  id,
  title: "Что такое Prime Oracles",
  subtitle: "Как работает платформа и на чем строится заработок - Тут будет описание",
  image: learningIntro,
  videoDescription: [
    "Как устроена площадка Prime Oracles",
    "На чем мы зарабатываем",
    "Бла бла бла Блэ блэ блэ Блу блу блу",
  ],
  articleContent: "Пересказ видео в тексте. Здесь будет полный текст статьи с подробным описанием всех аспектов работы платформы Prime Oracles. Мы расскажем о том, как начать работу, какие инструменты доступны и как максимизировать свой доход.",
});
