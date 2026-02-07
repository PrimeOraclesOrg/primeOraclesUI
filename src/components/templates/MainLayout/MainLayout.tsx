import { ReactNode } from "react";
import { Sidebar, MobileHeader, Footer } from "@/components/organisms";
import { cn } from "@/utils";

interface MainLayoutProps {
  children: ReactNode;
  wrapperClassName?: string;
}

export function MainLayout({ children, wrapperClassName }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background ">
      <MobileHeader />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="w-full min-h-screen pt-[57px] lg:pt-0 min-w-0">
          <div className={cn("m-4 md:border md:rounded-lg border-border", wrapperClassName)}>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
