import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Settings as SettingsIcon, Shield, Wallet, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BasicSettings, SecuritySettings, BalanceSettings, OrderHistory } from "@/components/settings";

type SettingsTab = "basic" | "security" | "balance" | "history";

const tabItems = [
  { id: "basic" as const, label: "Основные", icon: SettingsIcon },
  { id: "security" as const, label: "Безопасность", icon: Shield },
  { id: "balance" as const, label: "Баланс", icon: Wallet },
  { id: "history" as const, label: "История заказов", icon: FileText },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("basic");

  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicSettings />;
      case "security":
        return <SecuritySettings />;
      case "balance":
        return <BalanceSettings />;
      case "history":
        return <OrderHistory />;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Настройки Аккаунта</h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left sidebar with profile and tabs */}
          <div className="w-full lg:w-64 shrink-0">
            {/* Profile card */}
            <div className="mb-6 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-muted overflow-hidden lg:mb-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Lesha Maisak</h2>
                <p className="text-muted-foreground text-sm">@Leshamais</p>
              </div>
            </div>

            {/* Navigation tabs - horizontal scroll on mobile */}
            <nav className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выход
            </Button>
          </div>

          {/* Content area */}
          <div className="flex-1 max-w-2xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
