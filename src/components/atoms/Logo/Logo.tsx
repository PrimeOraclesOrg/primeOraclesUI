/**
 * Logo Component
 * 
 * Brand logo for Prime Oracles platform.
 */

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { bars: "h-6", text: "text-lg" },
    md: { bars: "h-8", text: "text-xl" },
    lg: { bars: "h-10", text: "text-2xl" },
  };

  const { bars, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Bar chart icon representing oracles/data */}
      <div className={`flex items-end gap-0.5 ${bars}`}>
        <div className="w-1.5 h-1/3 bg-primary rounded-sm" />
        <div className="w-1.5 h-1/2 bg-primary rounded-sm" />
        <div className="w-1.5 h-2/3 bg-primary rounded-sm" />
        <div className="w-1.5 h-full bg-primary rounded-sm" />
        <div className="w-1.5 h-2/3 bg-primary rounded-sm" />
        <div className="w-1.5 h-1/2 bg-primary rounded-sm" />
        <div className="w-1.5 h-1/3 bg-primary rounded-sm" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-semibold text-foreground ${text}`}>Prime</span>
        <span className={`font-semibold text-foreground ${text}`}>Oracles</span>
      </div>
      {/* Right side bars */}
      <div className={`flex items-end gap-0.5 ${bars}`}>
        <div className="w-1.5 h-1/3 bg-primary rounded-sm" />
        <div className="w-1.5 h-1/2 bg-primary rounded-sm" />
        <div className="w-1.5 h-2/3 bg-primary rounded-sm" />
        <div className="w-1.5 h-full bg-primary rounded-sm" />
        <div className="w-1.5 h-2/3 bg-primary rounded-sm" />
        <div className="w-1.5 h-1/2 bg-primary rounded-sm" />
        <div className="w-1.5 h-1/3 bg-primary rounded-sm" />
      </div>
    </div>
  );
}
