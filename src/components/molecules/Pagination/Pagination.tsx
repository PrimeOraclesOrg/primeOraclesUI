import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  visiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
}: PaginationProps) {
  const pages = Array.from({ length: Math.min(visiblePages, totalPages) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "ghost"}
          size="icon"
          className="w-8 h-8"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {totalPages > visiblePages && (
        <>
          <span className="px-2 text-muted-foreground">...</span>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
