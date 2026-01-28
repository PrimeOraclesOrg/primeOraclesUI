import { cn } from "@/lib/utils";
import { workspaceStatusTabs } from "@/data/workspaceProducts";

type StatusTabId = "all" | "active" | "archived";

interface WorkspaceStatusTabsProps {
  activeTab: StatusTabId;
  onTabChange: (tab: StatusTabId) => void;
}

export function WorkspaceStatusTabs({
  activeTab,
  onTabChange,
}: WorkspaceStatusTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {workspaceStatusTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as StatusTabId)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "gold-gradient text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
