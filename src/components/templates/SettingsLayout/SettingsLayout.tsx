import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { Settings as SettingsIcon, Shield, Wallet, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/helpers";
import { UserAvatar } from "@/components/molecules/UserAvatar/UserAvatar";
import { ReactNode } from "react";
import { SettingsTab } from "@/pages/Settings/types";

const tabItems = [
  { id: "basic" as const, label: "Основные", icon: SettingsIcon },
  { id: "security" as const, label: "Безопасность", icon: Shield },
  { id: "balance" as const, label: "Баланс", icon: Wallet },
  { id: "history" as const, label: "История заказов", icon: FileText },
];

interface SettingsLayoutProps {
  activeTab: SettingsTab;
  name: string;
  username: string;
  onTabChange: (tab: SettingsTab) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function SettingsLayout({
  activeTab,
  name,
  username,
  onTabChange,
  onLogout,
  children,
}: SettingsLayoutProps) {
  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Настройки Аккаунта</h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left sidebar with profile and tabs */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-0">
              {/* Profile card */}
              <div className="mb-6 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                <UserAvatar className="w-16 h-16 lg:w-20 lg:h-20 lg:mb-3" />
                <div className="max-w-full">
                  <h2 className="font-semibold text-lg overflow-hidden text-ellipsis">{name}</h2>
                  <p className="text-muted-foreground text-sm overflow-hidden text-ellipsis">
                    @{username}
                  </p>
                </div>
              </div>

              {/* Navigation tabs */}
              <nav className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                      "flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-left transition-colors whitespace-nowrap",
                      activeTab === tab.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout button */}
              <Button
                variant="outline"
                className="w-full mt-6 lg:mt-8 border-primary/50 text-primary hover:bg-primary/10"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выход
              </Button>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 max-w-2xl">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
