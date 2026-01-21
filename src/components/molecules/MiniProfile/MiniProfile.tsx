import { UserAvatar } from "@/components/molecules/UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";
import { selectAuthProfile } from "@/store";
import { cn } from "@/utils";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

interface SidebarProfileProps {
  isActive: (href: string) => boolean;
}

export const MiniProfile = ({ isActive }: SidebarProfileProps) => {
  const profile = useSelector(selectAuthProfile);

  return (
    <div className="p-4 border-t border-sidebar-border">
      {profile && (
        <NavLink
          to="/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group/profile",
            isActive("/profile")
              ? "text-sidebar-foreground bg-sidebar-accent"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <UserAvatar />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-nowrap text-ellipsis overflow-hidden">
              Личный профиль
            </span>
            <span className="text-md font-medium text-foreground text-nowrap text-ellipsis overflow-hidden">
              {profile?.name}
            </span>
            <span className="text-xs font-medium text-nowrap text-ellipsis overflow-hidden">
              @{profile?.username}
            </span>
          </div>
        </NavLink>
      )}

      {!profile && (
        <Button className="w-full" asChild>
          <Link to={"/login"}>Присоеденится</Link>
        </Button>
      )}
    </div>
  );
};
