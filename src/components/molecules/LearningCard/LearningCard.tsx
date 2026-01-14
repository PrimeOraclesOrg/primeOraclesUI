import { Button } from "@/components/ui/button";

interface LearningCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  onClick?: () => void;
}

export function LearningCard({
  title,
  description,
  image,
  categories,
  onClick,
}: LearningCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 surface-card animate-fade-in">
      <div className="w-full md:w-64 aspect-video rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Категория:</span>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-xs rounded-full border border-primary text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={onClick}
            className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-8"
          >
            Смотреть
          </Button>
        </div>
      </div>
    </div>
  );
}
