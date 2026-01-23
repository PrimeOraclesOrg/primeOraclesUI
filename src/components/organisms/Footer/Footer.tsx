import { BrandLogo } from "@/components/atoms";
import { Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center py-8 bg-sidebar border-t border-sidebar-border">
      <div className="flex w-full max-w-screen-2xl px-8 sm:justify-between items-center sm:flex-row flex-col justify-center gap-4 sm:gap-2">
        <p className="text-muted-foreground">© 2025 PrimeOracles | Все права защищены</p>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <Link to="#" className="text-muted-foreground">
              <Youtube />
            </Link>
            <Link to="#" className="text-muted-foreground">
              <Instagram />
            </Link>
          </div>
          <BrandLogo className="text-primary" />
        </div>
      </div>
    </footer>
  );
};
