import { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNavItems, workspaceItems } from "@/config/navigation";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-primary text-xl font-bold">❙❙❙</span>
          <span className="text-primary text-lg font-bold">Prime</span>
          <span className="text-primary text-lg font-bold">❙❙❙</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={cn(
          "lg:hidden fixed top-[57px] left-0 right-0 bottom-0 z-40 bg-sidebar transform transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <RouterNavLink
                  to={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
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
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
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
                            onClick={closeMenu}
                            className={cn(
                              "block px-3 py-2 text-sm rounded transition-colors",
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

          <div className="mt-6 pt-6 border-t border-sidebar-border">
            <RouterNavLink
              to="/profile"
              onClick={closeMenu}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
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
        </div>
      </nav>
    </>
  );
}
