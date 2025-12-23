import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { Loader } from "@/components/atoms";
import { Play } from "lucide-react";
import type { LessonDetails } from "@/types";

interface LearningDetailTemplateProps {
  lesson: LessonDetails | undefined;
  isLoading: boolean;
}

export function LearningDetailTemplate({ lesson, isLoading }: LearningDetailTemplateProps) {
  if (isLoading || !lesson) {
    return (
      <MainLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader size="lg" />
        </div>
      </MainLayout>
    );
  }

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
