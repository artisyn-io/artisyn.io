"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SearchSortValue =
  | "relevance"
  | "rating_desc"
  | "newest"
  | "price_asc"
  | "price_desc";

export type SearchSortOption = {
  label: string;
  value: SearchSortValue;
};

export const ARTISAN_SEARCH_SORT_OPTIONS: SearchSortOption[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Highest rated", value: "rating_desc" },
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price_asc" },
  { label: "Price: high to low", value: "price_desc" },
];

type SortControlProps = {
  className?: string;
  disabled?: boolean;
  label?: string;
  onSortChange: (sort: SearchSortValue) => void;
  options?: SearchSortOption[];
  value: SearchSortValue;
};

export function SortControl({
  className,
  disabled = false,
  label = "Sort by",
  onSortChange,
  options = ARTISAN_SEARCH_SORT_OPTIONS,
  value,
}: SortControlProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-sm font-medium text-[#475569]">{label}</span>
      <Select
        disabled={disabled}
        onValueChange={(nextValue) => onSortChange(nextValue as SearchSortValue)}
        value={value}
      >
        <SelectTrigger
          aria-label={label}
          className="h-10 min-w-44 rounded-xl border-[#E2E8F0] bg-white text-[#020817]"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
