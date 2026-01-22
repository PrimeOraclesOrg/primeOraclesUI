import { ReactNode } from "react";
import { Sidebar, MobileHeader, Footer } from "@/components/organisms";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="min-h-screen pt-[57px] lg:pt-0 min-w-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
