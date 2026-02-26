import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { ForwardedRef, forwardRef, InputHTMLAttributes, useState } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchBar = forwardRef(
  (
    { className, onChange, onClear, ...props }: SearchBarProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = useState("");

    return (
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Введите запрос"
          {...props}
          onChange={(event) => {
            onChange(event);
            setValue(event.target.value);
          }}
          ref={ref}
          className={cn(
            "pl-12 h-11 bg-secondary border-border rounded-full text-foreground placeholder:text-muted-foreground focus:ring-primary",
            className
          )}
        />
        {onClear && value && (
          <button
            className="bg-transparent border-none absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => {
              onClear();
              setValue("");
            }}
            type="button"
          >
            <X width={16} />
          </button>
        )}
      </div>
    );
  }
);
