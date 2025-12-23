import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { CategoryTabs, LearningCard } from "@/components/molecules";
import type { LearningItem } from "@/types";

interface LearningTemplateProps {
  items: LearningItem[];
  categories: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onItemClick: (id: string) => void;
}

export function LearningTemplate({
  items,
  categories,
  activeTab,
  onTabChange,
  onItemClick,
}: LearningTemplateProps) {
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
            categories={categories}
            activeCategory={activeTab}
            onCategoryChange={onTabChange}
          />
        </div>

        {/* Learning Cards */}
        <div className="space-y-6">
          {items.map((item, index) => (
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
                onClick={() => onItemClick(item.id)}
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
