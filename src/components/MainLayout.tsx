import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { MobileMenu } from "./MobileMenu";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu />
      
      <main className="lg:ml-64 min-h-screen pt-[57px] lg:pt-0">
        {children}
      </main>
    </div>
  );
}
