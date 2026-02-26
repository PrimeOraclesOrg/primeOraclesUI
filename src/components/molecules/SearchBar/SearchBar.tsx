import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

export const SearchBar = forwardRef(
  (
    { className, ...props }: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Введите запрос"
          {...props}
          ref={ref}
          className={cn(
            "pl-12 h-11 bg-secondary border-border rounded-full text-foreground placeholder:text-muted-foreground focus:ring-primary",
            className
          )}
        />
      </div>
    );
  }
);
