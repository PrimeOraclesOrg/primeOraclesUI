import { ReactNode } from "react";
import { Sidebar, MobileHeader } from "@/components/organisms";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <MobileHeader />
      <main className="lg:ml-64 min-h-screen pt-[57px] lg:pt-0">
        {children}
      </main>
    </div>
  );
}
