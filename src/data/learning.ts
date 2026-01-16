import type { LearningItem } from "@/types";

import learningIntro from "@/assets/learning-intro.jpg";
import learningCrypto from "@/assets/learning-crypto.jpg";
import learningTrust from "@/assets/learning-trust.jpg";

export const learningCategories = [
  "Старт на Prime Oracles",
  "Создание контента",
  "Продажа и упаковка",
];

export const mockLearningItems: LearningItem[] = [
  {
    id: "1",
    title: "Что такое Prime Oracles",
    description: "Как работает платформа и на чем строится заработок - Тут будет описание",
    image: learningIntro,
    categories: ["Статья", "Видео"],
    tab: "Старт на Prime Oracles",
  },
  {
    id: "2",
    title: "Как пополнить счет если у вас нет криптовалюты",
    description: "Описание",
    image: learningCrypto,
    categories: ["Статья", "Видео"],
    tab: "Старт на Prime Oracles",
  },
  {
    id: "3",
    title: "Почему нам стоит доверять",
    description: "Описание",
    image: learningTrust,
    categories: ["Статья", "Видео"],
    tab: "Старт на Prime Oracles",
  },
  {
    id: "4",
    title: "Как создать продающий контент",
    description: "Пошаговое руководство по созданию контента, который продает",
    image: learningIntro,
    categories: ["Видео"],
    tab: "Создание контента",
  },
  {
    id: "5",
    title: "Основы маркетинга для продавцов",
    description: "Узнайте основы маркетинга для успешных продаж",
    image: learningCrypto,
    categories: ["Статья"],
    tab: "Продажа и упаковка",
  },
];
