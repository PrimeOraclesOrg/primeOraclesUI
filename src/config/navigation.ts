import {
  Home,
  Gift,
  Store,
  GraduationCap,
  Mail,
  Bell,
  Briefcase,
  ShoppingCart,
  PlusCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNavItems: NavItem[] = [
  { icon: Home, label: "Главная страница", href: "/" },
  { icon: Gift, label: "Награды за контент", href: "/rewards" },
  { icon: Store, label: "Маркетплейс", href: "/marketplace" },
  { icon: GraduationCap, label: "Обучение", href: "/learning" },
  { icon: Mail, label: "Сообщения", href: "/messages" },
  { icon: Bell, label: "Уведомления", href: "/notifications" },
];

export const workspaceItems: NavItem[] = [
  {
    icon: Briefcase,
    label: "Рабочее пространство",
    href: "/workspace",
    children: [
      { label: "Маркетплейс", href: "/workspace/marketplace" },
      { label: "Награда за контент", href: "/workspace/rewards" },
    ],
  },
  { icon: ShoppingCart, label: "Мои покупки", href: "/purchases" },
  { icon: PlusCircle, label: "Создать продукт", href: "/create-product" },
];
