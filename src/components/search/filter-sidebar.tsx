"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SearchFilterValue = {
  category?: string;
  location?: string;
  maxPrice?: number;
  minPrice?: number;
  verifiedOnly?: boolean;
};

type SearchFilterDraft = {
  category: string;
  location: string;
  maxPrice: string;
  minPrice: string;
  verifiedOnly: boolean;
};

type FilterSidebarProps = {
  categories?: string[];
  className?: string;
  initialValue?: Partial<SearchFilterValue>;
  onChange: (filters: SearchFilterValue) => void;
  title?: string;
};

const DEFAULT_CATEGORY_VALUE = "all-categories";

function toDraft(value?: Partial<SearchFilterValue>): SearchFilterDraft {
  return {
    category: value?.category ?? "",
    location: value?.location ?? "",
    maxPrice:
      typeof value?.maxPrice === "number" ? String(value.maxPrice) : "",
    minPrice:
      typeof value?.minPrice === "number" ? String(value.minPrice) : "",
    verifiedOnly: value?.verifiedOnly ?? false,
  };
}

function parsePrice(value: string) {
  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    return undefined;
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue)) {
    return undefined;
  }

  return Math.max(parsedValue, 0);
}

export function normalizeSearchFilters(
  draft: SearchFilterDraft
): SearchFilterValue {
  const category = draft.category.trim();
  const location = draft.location.trim();
  const parsedMinPrice = parsePrice(draft.minPrice);
  const parsedMaxPrice = parsePrice(draft.maxPrice);
  const minPrice =
    parsedMinPrice !== undefined &&
    parsedMaxPrice !== undefined &&
    parsedMinPrice > parsedMaxPrice
      ? parsedMaxPrice
      : parsedMinPrice;
  const maxPrice =
    parsedMinPrice !== undefined &&
    parsedMaxPrice !== undefined &&
    parsedMinPrice > parsedMaxPrice
      ? parsedMinPrice
      : parsedMaxPrice;

  return {
    category: category || undefined,
    location: location || undefined,
    maxPrice,
    minPrice,
    verifiedOnly: draft.verifiedOnly || undefined,
  };
}

export function FilterSidebar({
  categories = [],
  className,
  initialValue,
  onChange,
  title = "Filter artisans",
}: FilterSidebarProps) {
  const [draft, setDraft] = useState<SearchFilterDraft>(() =>
    toDraft(initialValue)
  );

  const normalizedFilters = useMemo(
    () => normalizeSearchFilters(draft),
    [draft]
  );

  useEffect(() => {
    onChange(normalizedFilters);
  }, [normalizedFilters, onChange]);

  const handleFieldChange = (
    field: keyof SearchFilterDraft,
    nextValue: SearchFilterDraft[keyof SearchFilterDraft]
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: nextValue,
    }));
  };

  const resetFilters = () => {
    setDraft(toDraft());
  };

  return (
    <aside
      className={cn(
        "w-full rounded-xl border border-[#E2E8F0] bg-white p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">
            Filters
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[#0F172A]">{title}</h2>
        </div>
        <Button
          className="rounded-md border-[#E2E8F0] bg-white text-[#475569] shadow-none"
          onClick={resetFilters}
          type="button"
          variant="outline"
        >
          Reset
        </Button>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#334155]" htmlFor="category">
            Category
          </Label>
          <Select
            onValueChange={(nextValue) =>
              handleFieldChange(
                "category",
                nextValue === DEFAULT_CATEGORY_VALUE ? "" : nextValue
              )
            }
            value={draft.category || DEFAULT_CATEGORY_VALUE}
          >
            <SelectTrigger
              aria-label="Category"
              className="h-9 rounded-md border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#020817]"
              id="category"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DEFAULT_CATEGORY_VALUE}>All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#334155]" htmlFor="location">
            Location
          </Label>
          <Input
            className="h-9 rounded-md border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#020817]"
            id="location"
            onChange={(event) => handleFieldChange("location", event.target.value)}
            placeholder="City or area"
            value={draft.location}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#334155]" htmlFor="verified-only">
            Verification
          </Label>
          <label
            className="flex items-center gap-3 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#334155]"
            htmlFor="verified-only"
          >
            <input
              checked={draft.verifiedOnly}
              className="size-4 rounded border-[#CBD5E1] text-[#605DEC] accent-[#605DEC]"
              id="verified-only"
              onChange={(event) =>
                handleFieldChange("verifiedOnly", event.target.checked)
              }
              type="checkbox"
            />
            Show verified artisans only
          </label>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#334155]">Price range</Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                className="text-xs font-medium uppercase tracking-[0.16em] text-[#64748B]"
                htmlFor="min-price"
              >
                Minimum
              </Label>
              <Input
                className="h-9 rounded-md border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#020817]"
                id="min-price"
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  handleFieldChange("minPrice", event.target.value)
                }
                placeholder="0"
                type="number"
                value={draft.minPrice}
              />
            </div>

            <div className="space-y-2">
              <Label
                className="text-xs font-medium uppercase tracking-[0.16em] text-[#64748B]"
                htmlFor="max-price"
              >
                Maximum
              </Label>
              <Input
                className="h-9 rounded-md border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#020817]"
                id="max-price"
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  handleFieldChange("maxPrice", event.target.value)
                }
                placeholder="250"
                type="number"
                value={draft.maxPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
