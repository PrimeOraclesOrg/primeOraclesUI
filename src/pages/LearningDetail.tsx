import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { ChevronLeft, Play } from "lucide-react";

import learningIntro from "@/assets/learning-intro.jpg";

export default function LearningDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const lesson = {
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
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-2">
          {lesson.title}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {lesson.subtitle}
        </p>

        {/* Video Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 group cursor-pointer">
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-20 h-20 rounded-full border-2 border-foreground/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-foreground/80 ml-1" />
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="mb-12">
          <h2 className="text-primary font-semibold mb-4">О чем это видео:</h2>
          <ul className="space-y-2 text-muted-foreground">
            {lesson.videoDescription.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-12" />

        {/* Article Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Статья:
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {lesson.articleContent}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
