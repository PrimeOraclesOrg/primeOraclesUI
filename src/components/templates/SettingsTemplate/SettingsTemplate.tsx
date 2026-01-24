import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { StatusBadge } from "@/components/atoms";
import {
  Settings as SettingsIcon,
  Shield,
  Wallet,
  FileText,
  LogOut,
  Pencil,
  Check,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/helpers";
import type { SocialLink, Transaction, Order } from "@/types";
import { TikTokIcon } from "@/assets/icons";

type SettingsTab = "basic" | "security" | "balance" | "history";

const tabItems = [
  { id: "basic" as const, label: "Основные", icon: SettingsIcon },
  { id: "security" as const, label: "Безопасность", icon: Shield },
  { id: "balance" as const, label: "Баланс", icon: Wallet },
  { id: "history" as const, label: "История заказов", icon: FileText },
];

interface BasicSettingsProps {
  name: string;
  description: string;
  socialLinks: SocialLink[];
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSocialLinkChange: (index: number, url: string) => void;
  onSave: () => void;
}

function BasicSettings({
  name,
  description,
  socialLinks,
  onNameChange,
  onDescriptionChange,
  onSocialLinkChange,
  onSave,
}: BasicSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Имя</label>
        <div className="relative">
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-card border-border pr-10"
          />
          <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Описание</label>
        <div className="relative">
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Описание"
            className="bg-card border-border min-h-[100px] pr-10"
          />
          <Pencil className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-3 block">
          Добавьте ссылки на ваши аккаунты
        </label>
        <div className="space-y-2">
          {socialLinks.map((link, index) => (
            <div
              key={link.type}
              className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm",
                  link.type === "youtube" && "bg-red-600",
                  link.type === "instagram" &&
                    "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
                  link.type === "tiktok" && "bg-black"
                )}
              >
                {link.type === "instagram" && <Instagram />}
                {link.type === "tiktok" && <TikTokIcon />}
                {link.type === "youtube" && <Youtube />}
              </div>
              <Input
                value={link.link}
                onChange={(e) => onSocialLinkChange(index, e.target.value)}
                className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={onSave}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6"
      >
        Сохранить
      </Button>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Защитите свою учетную запись, запросив проверочный код при входе в систему.
      </p>

      <div className="bg-card border border-primary/30 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className="font-medium">Двухфакторная аутентификация ( Рекомендуется )</p>
            <p className="text-sm text-muted-foreground">
              Получите код через приложение-аутентификатор.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Подключить 2FA
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-medium">Пароль</p>
          <p className="text-sm text-muted-foreground">Вы можете изменить пароль в любой момент</p>
        </div>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Изменить пароль
        </Button>
      </div>
    </div>
  );
}

interface BalanceSettingsProps {
  balance: number;
  transactions: Transaction[];
}

function BalanceSettings({ balance, transactions }: BalanceSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Доступный баланс</p>
        <p className="text-4xl font-bold mt-1">$ {balance.toFixed(2)}</p>
      </div>

      <div className="h-px bg-border" />

      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Пополнить
        </Button>
        <Button variant="outline" className="border-border hover:bg-accent px-8">
          Вывести
        </Button>
      </div>

      <div>
        <h3 className="font-medium mb-4 border-b border-border pb-2">История</h3>
        <div className="space-y-0">
          <div className="grid grid-cols-3 text-sm text-muted-foreground py-2 border-b border-border">
            <span>Сумма</span>
            <span>Статус</span>
            <span>Отправлено</span>
          </div>
          {transactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-3 py-3 border-b border-border items-center">
              <span>$ {tx.amount.toFixed(2)}</span>
              <span>
                <StatusBadge status={tx.status} type="transaction" />
              </span>
              <div className="text-sm">
                <p>{tx.method}</p>
                <p className="text-muted-foreground text-xs truncate">{tx.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8">
        * Prime Oracles — технологическая компания, а не банк. Платежные услуги предоставляются
        партнёрами Prime Oracles. Балансы Prime Oracles не застрахованы
      </p>
    </div>
  );
}

interface OrderHistoryProps {
  orders: Order[];
}

function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <div>
      <h3 className="text-xl font-medium italic mb-4">История заказов</h3>
      <div className="space-y-0">
        <div className="grid grid-cols-4 text-sm text-muted-foreground py-2 border-b border-border">
          <span>Заголовок</span>
          <span>Статус</span>
          <span>Тип</span>
          <span>Сумма</span>
        </div>
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-4 py-3 border-b border-border items-center">
            <span>{order.title}</span>
            <span>
              <StatusBadge status={order.status} type="order" />
            </span>
            <span className="text-muted-foreground">{order.type}</span>
            <span>$ {order.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SettingsTemplateProps {
  activeTab: SettingsTab;
  name: string;
  description: string;
  socialLinks: SocialLink[];
  balance: number;
  transactions: Transaction[];
  orders: Order[];
  onTabChange: (tab: SettingsTab) => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSocialLinkChange: (index: number, url: string) => void;
  onSaveBasic: () => void;
  onLogout: () => void;
}

export function SettingsTemplate({
  activeTab,
  name,
  description,
  socialLinks,
  balance,
  transactions,
  orders,
  onTabChange,
  onNameChange,
  onDescriptionChange,
  onSocialLinkChange,
  onSaveBasic,
  onLogout,
}: SettingsTemplateProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicSettings
            name={name}
            description={description}
            socialLinks={socialLinks}
            onNameChange={onNameChange}
            onDescriptionChange={onDescriptionChange}
            onSocialLinkChange={onSocialLinkChange}
            onSave={onSaveBasic}
          />
        );
      case "security":
        return <SecuritySettings />;
      case "balance":
        return <BalanceSettings balance={balance} transactions={transactions} />;
      case "history":
        return <OrderHistory orders={orders} />;
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
                <h2 className="font-semibold text-lg">{name}</h2>
                <p className="text-muted-foreground text-sm">@Leshamais</p>
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

          {/* Content area */}
          <div className="flex-1 max-w-2xl">{renderContent()}</div>
        </div>
      </div>
    </MainLayout>
  );
}
