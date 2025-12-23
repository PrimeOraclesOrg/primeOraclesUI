import { SocialIcons } from "@/components/atoms";
import type { Reward } from "@/types";

interface RewardCardProps extends Reward {}

export function RewardCard({
  logo,
  name,
  rate,
  description,
  paidAmount,
  totalAmount,
  progress,
  category,
  type,
  views,
  socialNetworks,
}: RewardCardProps) {
  const getProgressColor = () => {
    if (progress >= 80) return "bg-primary";
    if (progress >= 40) return "bg-primary";
    return "bg-destructive";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex items-center justify-center">
            <span className="text-lg font-bold">{logo}</span>
          </div>
          <span className="font-semibold text-foreground">{name}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-foreground">{rate}</span>
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Выплачено {paidAmount} из {totalAmount}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} rounded-full transition-all`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Категория</span>
          <p className="text-foreground font-medium mt-0.5">{category}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Тип</span>
          <p className="text-foreground font-medium mt-0.5">{type}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Социальные сети</span>
          <SocialIcons networks={socialNetworks} className="mt-1" />
        </div>
        <div>
          <span className="text-muted-foreground">Просмотры</span>
          <p className="text-foreground font-medium mt-0.5">{views}</p>
        </div>
      </div>
    </div>
  );
}
