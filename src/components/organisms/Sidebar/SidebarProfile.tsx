import { UserAvatar } from "@/components/molecules/UserAvatar/UserAvatar";
import { cn } from "@/utils";
import { NavLink } from "react-router-dom";

interface SidebarProfileProps {
  isActive: (href: string) => boolean;
}

export const SidebarProfile = ({ isActive }: SidebarProfileProps) => {
  return (
    <div className="p-4 border-t border-sidebar-border">
      <NavLink
        to="/profile"
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
          isActive("/profile")
            ? "text-foreground bg-sidebar-accent"
            : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <UserAvatar />
        </div>
        <span className="text-sm font-medium">Личный профиль</span>
      </NavLink>
    </div>
  );
};
