"use client";

import { useMemo, useState } from "react";

import {
  FilterSidebar,
  type SearchFilterValue,
} from "@/components/search/filter-sidebar";
import { PaginationControl } from "@/components/search/pagination-control";
import {
  ARTISAN_SEARCH_SORT_OPTIONS,
  SortControl,
  type SearchSortValue,
} from "@/components/search/sort-control";

const previewArtisans = [
  {
    name: "James Emeka",
    category: "Plumber",
    location: "Ikeja, Lagos",
    price: 45,
    rating: 4.9,
    verified: true,
  },
  {
    name: "Jane Smith",
    category: "Barber",
    location: "Yaba, Lagos",
    price: 30,
    rating: 4.8,
    verified: false,
  },
  {
    name: "Grace Fixer",
    category: "Painter",
    location: "Lekki, Lagos",
    price: 55,
    rating: 4.7,
    verified: true,
  },
  {
    name: "Amara Chike",
    category: "Electrician",
    location: "Abuja Municipal, Abuja",
    price: 60,
    rating: 4.6,
    verified: true,
  },
  {
    name: "Sofia Okafor",
    category: "Chef",
    location: "Surulere, Lagos",
    price: 75,
    rating: 4.9,
    verified: false,
  },
  {
    name: "John Doe",
    category: "Cleaner",
    location: "Ibadan North, Oyo",
    price: 25,
    rating: 4.5,
    verified: false,
  },
  {
    name: "Tunde Bello",
    category: "Carpenter",
    location: "Abeokuta, Ogun",
    price: 50,
    rating: 4.4,
    verified: true,
  },
  {
    name: "Mina Adebayo",
    category: "Tailor",
    location: "Victoria Island, Lagos",
    price: 40,
    rating: 4.8,
    verified: true,
  },
  {
    name: "Kelvin Obi",
    category: "Mechanic",
    location: "Gwarinpa, Abuja",
    price: 65,
    rating: 4.3,
    verified: false,
  },
  {
    name: "Ada Nwosu",
    category: "Tech Repair",
    location: "Enugu North, Enugu",
    price: 70,
    rating: 4.7,
    verified: true,
  },
  {
    name: "Femi Cole",
    category: "Plumber",
    location: "Ikorodu, Lagos",
    price: 35,
    rating: 4.2,
    verified: false,
  },
  {
    name: "Ife Martins",
    category: "Painter",
    location: "Port Harcourt, Rivers",
    price: 48,
    rating: 4.6,
    verified: true,
  },
];

const PAGE_SIZE = 4;
const PREVIEW_CATEGORIES = Array.from(
  new Set(previewArtisans.map((artisan) => artisan.category))
).sort((first, second) => first.localeCompare(second));

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
  const [filters, setFilters] = useState<SearchFilterValue>({});

  const filteredArtisans = useMemo(() => {
    return previewArtisans.filter((artisan) => {
      const matchesCategory =
        !filters.category || artisan.category === filters.category;
      const matchesLocation =
        !filters.location ||
        artisan.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMinPrice =
        filters.minPrice === undefined || artisan.price >= filters.minPrice;
      const matchesMaxPrice =
        filters.maxPrice === undefined || artisan.price <= filters.maxPrice;
      const matchesVerification =
        !filters.verifiedOnly || artisan.verified;

      return (
        matchesCategory &&
        matchesLocation &&
        matchesVerification &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [filters]);

  const sortedArtisans = useMemo(
    () => sortArtisans(filteredArtisans, sortValue),
    [filteredArtisans, sortValue]
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
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <FilterSidebar
          categories={PREVIEW_CATEGORIES}
          onChange={setFilters}
          title="Refine your artisan search"
        />

        <div className="flex flex-col gap-8">
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

            <div className="flex items-center justify-between text-sm text-[#64748B]">
              <span>{filteredArtisans.length} results</span>
              {filters.verifiedOnly ? (
                <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-medium text-[#605DEC]">
                  Verified only
                </span>
              ) : null}
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
                    {artisan.location}
                  </p>
                  <p className="mt-2 text-sm text-[#475569]">
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

          <div className="bg-white p-5">
            <h2 className="text-base font-semibold text-[#262626]">
              Emitted filter payload
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#F8FAFC] p-4 text-sm text-[#475569]">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
