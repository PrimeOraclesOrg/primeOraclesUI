import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { cn } from "@/lib/utils";
import { Settings as SettingsIcon, Shield, Wallet, FileText, LogOut, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SettingsTab = "basic" | "security" | "balance" | "history";

interface SocialLink {
  platform: "youtube" | "instagram" | "tiktok";
  url: string;
  icon: string;
  color: string;
}

interface Transaction {
  id: string;
  amount: number;
  status: "pending" | "deposit" | "withdrawn";
  method: string;
  address: string;
}

interface Order {
  id: string;
  title: string;
  status: "completed" | "pending" | "purchased";
  type: string;
  amount: number;
}

const mockSocialLinks: SocialLink[] = [
  { platform: "youtube", url: "https://www.youtube.com/@LeshaMaisak", icon: "▶", color: "bg-red-600" },
  { platform: "instagram", url: "https://www.instagram.com/@Lesha.Im", icon: "◎", color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" },
  { platform: "tiktok", url: "https://www.tiktok.com/@lesha.Im", icon: "♪", color: "bg-black" },
];

const mockTransactions: Transaction[] = [
  { id: "1", amount: 22.00, status: "pending", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
  { id: "2", amount: 30.00, status: "deposit", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
  { id: "3", amount: 15.00, status: "deposit", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
  { id: "4", amount: 15.00, status: "withdrawn", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
];

const mockOrders: Order[] = [
  { id: "1", title: "Mellstroy game", status: "completed", type: "Награда за контен", amount: 22.00 },
  { id: "2", title: "Торговый бот", status: "pending", type: "Маркетплейс", amount: 353.00 },
  { id: "3", title: "Трусы", status: "purchased", type: "Маркетплейс", amount: 5.00 },
];

const tabItems = [
  { id: "basic" as const, label: "Основные", icon: SettingsIcon },
  { id: "security" as const, label: "Безопасность", icon: Shield },
  { id: "balance" as const, label: "Баланс", icon: Wallet },
  { id: "history" as const, label: "История заказов", icon: FileText },
];

function BasicSettings() {
  const [name, setName] = useState("Lesha Maisak");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState(mockSocialLinks);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Имя</label>
        <div className="relative">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            className="bg-card border-border min-h-[100px] pr-10"
          />
          <Pencil className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-3 block">Добавьте ссылки на ваши аккаунты</label>
        <div className="space-y-2">
          {socialLinks.map((link, index) => (
            <div key={link.platform} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm", link.color)}>
                {link.icon}
              </div>
              <Input
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index].url = e.target.value;
                  setSocialLinks(newLinks);
                }}
                className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
              />
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6">
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
            <p className="text-sm text-muted-foreground">Получите код через приложение-аутентификатор.</p>
          </div>
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Подключить 2FA
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-medium">Пароль</p>
          <p className="text-sm text-muted-foreground">Вы можете изменить пароль в любой момент</p>
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Изменить пароль
        </Button>
      </div>
    </div>
  );
}

function BalanceSettings() {
  const [balance] = useState(22.00);

  const getStatusStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return "border-yellow-500 text-yellow-500";
      case "deposit":
        return "border-green-500 text-green-500";
      case "withdrawn":
        return "border-blue-500 text-blue-500";
    }
  };

  const getStatusLabel = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return "Ожидание";
      case "deposit":
        return "Пополнение";
      case "withdrawn":
        return "Выведено";
    }
  };

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
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-3 py-3 border-b border-border items-center">
              <span>$ {tx.amount.toFixed(2)}</span>
              <span>
                <span className={cn("px-3 py-1 rounded-full border text-xs", getStatusStyle(tx.status))}>
                  {getStatusLabel(tx.status)}
                </span>
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
        * Prime Oracles — технологическая компания, а не банк. Платежные услуги предоставляются партнёрами Prime Oracles. Балансы Prime Oracles не застрахованы
      </p>
    </div>
  );
}

function OrderHistory() {
  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-500 text-green-500";
      case "pending":
        return "border-yellow-500 text-yellow-500";
      case "purchased":
        return "border-primary text-primary";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "Выполнено";
      case "pending":
        return "Ожидает подтверждения";
      case "purchased":
        return "Покупка";
    }
  };

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
        {mockOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-4 py-3 border-b border-border items-center">
            <span>{order.title}</span>
            <span>
              <span className={cn("px-3 py-1 rounded-full border text-xs", getStatusStyle(order.status))}>
                {getStatusLabel(order.status)}
              </span>
            </span>
            <span className="text-muted-foreground">{order.type}</span>
            <span>$ {order.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">Настройки Аккаунта</h1>

        <div className="flex gap-12">
          {/* Left sidebar with profile and tabs */}
          <div className="w-64 shrink-0">
            {/* Profile card */}
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-muted overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-semibold text-lg">Lesha Maisak</h2>
              <p className="text-muted-foreground text-sm">@Leshamais</p>
            </div>

            {/* Navigation tabs */}
            <nav className="space-y-1">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors",
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
              className="w-full mt-8 border-primary/50 text-primary hover:bg-primary/10"
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
