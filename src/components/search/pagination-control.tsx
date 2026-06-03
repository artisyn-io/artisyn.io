"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FormEvent } from "react";
import { useId, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PaginationControlProps = {
  className?: string;
  currentPage: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  totalPages: number;
};

type PageItem = number | "ellipsis";

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function getPageItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): PageItem[] {
  const safeCurrentPage = clampPage(currentPage, totalPages);
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(safeCurrentPage - siblingCount, 1);
  const rightSibling = Math.min(safeCurrentPage + siblingCount, totalPages);
  const shouldShowLeftEllipsis = leftSibling > 2;
  const shouldShowRightEllipsis = rightSibling < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => index + 1
    );

    return [...leftRange, "ellipsis", totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => totalPages - (3 + siblingCount * 2) + 1 + index
    );

    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index
  );

  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

export function PaginationControl({
  className,
  currentPage,
  disabled = false,
  onPageChange,
  siblingCount = 1,
  totalPages,
}: PaginationControlProps) {
  const pageJumpId = useId();
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = clampPage(currentPage, safeTotalPages);
  const pageItems = useMemo(
    () => getPageItems(safeCurrentPage, safeTotalPages, siblingCount),
    [safeCurrentPage, safeTotalPages, siblingCount]
  );
  const canGoPrevious = safeCurrentPage > 1 && !disabled;
  const canGoNext = safeCurrentPage < safeTotalPages && !disabled;

  const goToPage = (page: number) => {
    if (disabled) return;

    const nextPage = clampPage(page, safeTotalPages);

    if (nextPage !== safeCurrentPage) {
      onPageChange(nextPage);
    }
  };

  const handleJumpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const page = Number(formData.get("page"));

    if (Number.isFinite(page)) {
      goToPage(page);
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-col gap-3 text-sm text-[#475569] sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          aria-label="Previous page"
          className="size-9 rounded-md border-[#E2E8F0]"
          disabled={!canGoPrevious}
          onClick={() => goToPage(safeCurrentPage - 1)}
          size="icon"
          title="Previous page"
          type="button"
          variant="outline"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex items-center gap-1">
          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center text-[#94A3B8]"
                key={`ellipsis-${index}`}
              >
                ...
              </span>
            ) : (
              <Button
                aria-current={item === safeCurrentPage ? "page" : undefined}
                aria-label={`Page ${item}`}
                className={cn(
                  "size-9 rounded-md border-[#E2E8F0] text-sm",
                  item === safeCurrentPage &&
                    "border-[#605DEC] bg-[#605DEC] text-white hover:bg-[#605DEC]/90"
                )}
                disabled={disabled}
                key={item}
                onClick={() => goToPage(item)}
                size="icon"
                type="button"
                variant={item === safeCurrentPage ? "default" : "outline"}
              >
                {item}
              </Button>
            )
          )}
        </div>

        <Button
          aria-label="Next page"
          className="size-9 rounded-md border-[#E2E8F0]"
          disabled={!canGoNext}
          onClick={() => goToPage(safeCurrentPage + 1)}
          size="icon"
          title="Next page"
          type="button"
          variant="outline"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <form className="flex items-center gap-2" onSubmit={handleJumpSubmit}>
        <label className="text-sm font-medium text-[#475569]" htmlFor={pageJumpId}>
          Page
        </label>
        <Input
          className="h-9 w-16 rounded-md border-[#E2E8F0] text-center text-sm"
          defaultValue={safeCurrentPage}
          disabled={disabled}
          id={pageJumpId}
          inputMode="numeric"
          key={safeCurrentPage}
          max={safeTotalPages}
          min={1}
          name="page"
          type="number"
        />
        <span className="text-[#64748B]">of {safeTotalPages}</span>
      </form>
    </nav>
  );
}
