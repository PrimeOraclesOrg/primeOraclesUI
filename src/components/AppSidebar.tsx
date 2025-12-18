import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Gift,
  Store,
  GraduationCap,
  Mail,
  Bell,
  Briefcase,
  ShoppingCart,
  User,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: "Главная страница", href: "/" },
  { icon: Gift, label: "Награды за контент", href: "/rewards" },
  { icon: Store, label: "Маркетплейс", href: "/marketplace" },
  { icon: GraduationCap, label: "Обучение", href: "/learning" },
  { icon: Mail, label: "Сообщения", href: "/messages" },
  { icon: Bell, label: "Уведомления", href: "/notifications" },
];

const workspaceItems: NavItem[] = [
  { 
    icon: Briefcase, 
    label: "Рабочее пространство", 
    href: "/workspace",
    children: [
      { label: "Маркетплейс", href: "/workspace/marketplace" },
      { label: "Награда за контент", href: "/workspace/rewards" },
    ]
  },
  { icon: ShoppingCart, label: "Мои покупки", href: "/purchases" },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-1">
          <span className="text-primary text-2xl font-bold">❙❙❙</span>
          <span className="text-primary text-xl font-bold">Prime</span>
          <span className="text-primary text-xl font-bold">❙❙❙</span>
        </div>
        <span className="text-primary text-lg font-semibold ml-6">Oracles</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto scrollbar-hide">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <RouterNavLink
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(item.href)
                    ? "text-foreground bg-sidebar-accent"
                    : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </RouterNavLink>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-sidebar-border">
          <ul className="space-y-1">
            {workspaceItems.map((item) => (
              <li key={item.href}>
                <RouterNavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive(item.href)
                      ? "text-foreground bg-sidebar-accent"
                      : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </RouterNavLink>
                {item.children && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <RouterNavLink
                          to={child.href}
                          className={cn(
                            "block px-3 py-1.5 text-sm rounded transition-colors",
                            isActive(child.href)
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {child.label}
                        </RouterNavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <RouterNavLink
          to="/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            isActive("/profile")
              ? "text-foreground bg-sidebar-accent"
              : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Личный профиль</span>
        </RouterNavLink>
      </div>
    </aside>
  );
}
