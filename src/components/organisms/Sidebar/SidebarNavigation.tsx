import { NavLink } from "react-router-dom";
import { mainNavItems, workspaceItems } from "@/config/navigation";
import { cn } from "@/utils";

interface SidebarNavigationProps {
  isActive: (href: string) => boolean;
}

export const SidebarNavigation = ({ isActive }: SidebarNavigationProps) => {
  return (
    <nav className="flex-1 px-3 overflow-y-auto scrollbar-hide">
      <ul className="space-y-1">
        {mainNavItems.map((item) => (
          <li key={item.href}>
            <NavLink
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
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-sidebar-border">
        <ul className="space-y-1">
          {workspaceItems.map((item) => (
            <li key={item.href}>
              <NavLink
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
              </NavLink>

              {item.children && (
                <ul className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavLink
                        to={child.href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded transition-colors",
                          isActive(child.href)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
