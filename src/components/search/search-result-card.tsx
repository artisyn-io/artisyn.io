"use client";

import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";

import type { ArtisanSearchResult } from "@/components/search/artisan-search-data";

type SearchResultCardProps = {
  artisan: ArtisanSearchResult;
};

export function SearchResultCard({ artisan }: SearchResultCardProps) {
  return (
    <Link
      className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-colors hover:border-[#CBD5E1]"
      href={`/artisans/${artisan.id}`}
    >
      <div
        className="h-52 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${artisan.image})` }}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-semibold text-[#0F172A]">
                {artisan.name}
              </h2>
              {artisan.verified ? (
                <BadgeCheck className="size-4 text-[#605DEC]" />
              ) : null}
            </div>
            <p className="mt-1 text-sm text-[#64748B]">{artisan.category}</p>
          </div>

          <div className="rounded-md bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#4F46E5]">
            {artisan.rating.toFixed(1)}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-[#475569]">
          <MapPin className="size-4 text-[#94A3B8]" />
          <span>{artisan.location}</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-[#64748B]">Starting from</span>
          <span className="text-lg font-semibold text-[#0F172A]">
            ${artisan.price}
            <span className="ml-1 text-sm font-normal text-[#64748B]">/hr</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
