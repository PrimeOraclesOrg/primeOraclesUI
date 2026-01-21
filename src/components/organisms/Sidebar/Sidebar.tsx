import { Link, useLocation } from "react-router-dom";
import { SidebarNavigation } from "./SidebarNavigation";
import { BrandLogo } from "@/assets/icons";
import { MiniProfile } from "@/components/molecules";

export function Sidebar() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <Link to={"/"} className="p-6 flex">
        <BrandLogo className="text-primary" />
      </Link>

      <SidebarNavigation isActive={isActive} />

      <MiniProfile isActive={isActive} />
    </aside>
  );
}
