import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { CategoryTabs } from "@/components/CategoryTabs";
import { LearningCard } from "@/components/LearningCard";

import learningIntro from "@/assets/learning-intro.jpg";
import learningCrypto from "@/assets/learning-crypto.jpg";
import learningTrust from "@/assets/learning-trust.jpg";

const learningCategories = ["Старт на Prime Oracles", "Создание контента", "Продажа и упаковка"];

interface LearningItem {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  tab: string;
}

const learningItems: LearningItem[] = [
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

export default function Learning() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Старт на Prime Oracles");

  const filteredItems = learningItems.filter((item) => item.tab === activeTab);

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
          Обучение и гайды от Prime Oracles
        </h1>

        {/* Tabs */}
        <div className="mb-8">
          <CategoryTabs
            categories={learningCategories}
            activeCategory={activeTab}
            onCategoryChange={setActiveTab}
          />
        </div>

        {/* Learning Cards */}
        <div className="space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <LearningCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                categories={item.categories}
                onClick={() => navigate(`/learning/${item.id}`)}
              />
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          Практические материалы о том, как работать с платформой, создавать продающий контент и увеличивать просмотры.
        </p>
      </div>
    </MainLayout>
  );
}
