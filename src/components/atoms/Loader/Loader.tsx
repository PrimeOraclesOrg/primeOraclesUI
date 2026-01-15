import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function Loader({ size = "md", className }: LoaderProps) {
  return <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />;
}
