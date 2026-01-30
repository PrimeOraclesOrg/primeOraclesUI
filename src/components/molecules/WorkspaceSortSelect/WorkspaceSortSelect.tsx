import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { workspaceSortOptions } from "@/data";
import { WorkspaceSortOption } from "@/types/workspace";

interface WorkspaceSortSelectProps {
  value: WorkspaceSortOption;
  onChange: (value: WorkspaceSortOption) => void;
}

export function WorkspaceSortSelect({ value, onChange }: WorkspaceSortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Сортировка:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[160px] bg-secondary border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          {workspaceSortOptions.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="cursor-pointer focus:bg-primary/20 focus:text-primary data-[state=checked]:text-primary"
            >
              <div className="flex items-center gap-2">
                <span className={value === option.id ? "text-primary" : ""}>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
