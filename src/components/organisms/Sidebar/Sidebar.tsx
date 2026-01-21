import { useLocation } from "react-router-dom";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarProfile } from "./SidebarProfile";

export function Sidebar() {
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

      <SidebarNavigation isActive={isActive} />

      <SidebarProfile isActive={isActive} />
    </aside>
  );
}
