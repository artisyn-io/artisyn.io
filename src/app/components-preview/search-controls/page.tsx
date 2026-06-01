"use client";

import { useMemo, useState } from "react";

import { PaginationControl } from "@/components/search/pagination-control";
import {
  ARTISAN_SEARCH_SORT_OPTIONS,
  SortControl,
  type SearchSortValue,
} from "@/components/search/sort-control";

const previewArtisans = [
  { name: "James Emeka", category: "Plumber", rating: 4.9, price: 45 },
  { name: "Jane Smith", category: "Barber", rating: 4.8, price: 30 },
  { name: "Grace Fixer", category: "Painter", rating: 4.7, price: 55 },
  { name: "Amara Chike", category: "Electrician", rating: 4.6, price: 60 },
  { name: "Sofia Okafor", category: "Chef", rating: 4.9, price: 75 },
  { name: "John Doe", category: "Cleaner", rating: 4.5, price: 25 },
  { name: "Tunde Bello", category: "Carpenter", rating: 4.4, price: 50 },
  { name: "Mina Adebayo", category: "Tailor", rating: 4.8, price: 40 },
  { name: "Kelvin Obi", category: "Mechanic", rating: 4.3, price: 65 },
  { name: "Ada Nwosu", category: "Tech Repair", rating: 4.7, price: 70 },
  { name: "Femi Cole", category: "Plumber", rating: 4.2, price: 35 },
  { name: "Ife Martins", category: "Painter", rating: 4.6, price: 48 },
];

const PAGE_SIZE = 4;

function sortArtisans(
  artisans: typeof previewArtisans,
  sortValue: SearchSortValue
) {
  return [...artisans].sort((first, second) => {
    if (sortValue === "rating_desc") {
      return second.rating - first.rating;
    }

    if (sortValue === "newest") {
      return previewArtisans.indexOf(second) - previewArtisans.indexOf(first);
    }

    if (sortValue === "price_asc") {
      return first.price - second.price;
    }

    if (sortValue === "price_desc") {
      return second.price - first.price;
    }

    return first.name.localeCompare(second.name);
  });
}

export default function ComponentsPreviewPage() {
  const [sortValue, setSortValue] = useState<SearchSortValue>("relevance");
  const [page, setPage] = useState(1);

  const sortedArtisans = useMemo(
    () => sortArtisans(previewArtisans, sortValue),
    [sortValue]
  );
  const totalPages = Math.ceil(sortedArtisans.length / PAGE_SIZE);
  const pagedArtisans = sortedArtisans.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleSortChange = (nextSort: SearchSortValue) => {
    setSortValue(nextSort);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 text-[#020817]">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div>
          <p className="text-sm font-medium text-[#605DEC]">
            Components Preview
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#262626]">
            Search Controls
          </h1>
        </div>

        <div className="flex flex-col gap-4 bg-white p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SortControl onSortChange={handleSortChange} value={sortValue} />
            <div className="text-sm text-[#64748B]">
              Active backend sort:{" "}
              <span className="font-medium text-[#262626]">{sortValue}</span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {pagedArtisans.map((artisan) => (
              <article
                className="rounded-lg border border-[#E2E8F0] p-4"
                key={`${artisan.name}-${artisan.category}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-[#262626]">
                      {artisan.name}
                    </h2>
                    <p className="mt-1 text-sm text-[#64748B]">
                      {artisan.category}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-medium text-[#605DEC]">
                    {artisan.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[#475569]">
                  ${artisan.price}/hr
                </p>
              </article>
            ))}
          </div>

          <PaginationControl
            currentPage={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </div>

        <div className="bg-white p-5">
          <h2 className="text-base font-semibold text-[#262626]">
            Backend sort contract
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {ARTISAN_SEARCH_SORT_OPTIONS.map((option) => (
              <span
                className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-sm text-[#475569]"
                key={option.value}
              >
                {option.value}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
