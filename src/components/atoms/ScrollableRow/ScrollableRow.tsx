import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";

interface ScrollableRowProps {
  children: React.ReactNode;
  className?: string;
  scrollAmount?: number;
}

export function ScrollableRow({ children, className, scrollAmount = 200 }: ScrollableRowProps) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;
    setCanScrollLeft(scrollElement.scrollLeft > 0);
    setCanScrollRight(
      scrollElement.scrollLeft + scrollElement.clientWidth < scrollElement.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;
    updateScrollState();
    scrollElement.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(scrollElement);
    return () => {
      scrollElement.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, children]);

  const scrollBy = (dir: number) => {
    scrollElementRef.current?.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-start bg-gradient-to-r from-background via-background/80 to-transparent"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}

      <div ref={scrollElementRef} className={cn("overflow-x-auto scrollbar-hide flex", className)}>
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-end bg-gradient-to-l from-background via-background/80 to-transparent"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      )}
    </div>
  );
}
