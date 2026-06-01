"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PublicProfileHeroArtisan = {
  name: string;
  avatar: string;
  category: string;
  location: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  completedJobs?: number;
};

type PublicProfileHeroProps = {
  artisan: PublicProfileHeroArtisan;
  className?: string;
  contactLabel?: string;
  onContact?: () => void;
  onSave?: () => void;
  saveLabel?: string;
};

export function PublicProfileHero({
  artisan,
  className,
  contactLabel = "Contact",
  onContact,
  onSave,
  saveLabel = "Save",
}: PublicProfileHeroProps) {
  return (
    <section className={cn("bg-white", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:py-14">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F1F5F9]">
          <Image
            alt={`${artisan.name}, ${artisan.category}`}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 280px"
            src={artisan.avatar}
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-medium text-[#605DEC]">
              {artisan.category}
            </span>
            {artisan.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-3 py-1 text-sm font-medium text-[#047857]">
                <ShieldCheck className="size-4" />
                Verified
              </span>
            )}
          </div>

          <h1 className="mt-5 flex items-center gap-2 text-4xl font-bold text-[#262626]">
            {artisan.name}
            {artisan.verified && <BadgeCheck className="size-6 text-[#605DEC]" />}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#64748B]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {artisan.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="size-4 fill-yellow-500 text-yellow-500" />
              {artisan.rating.toFixed(1)} ({artisan.reviewCount} reviews)
            </span>
            {typeof artisan.completedJobs === "number" && (
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="size-4" />
                {artisan.completedJobs} completed jobs
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="gap-2 rounded-xl bg-[#605DEC] px-6 hover:bg-[#605DEC]/90"
              onClick={onContact}
              type="button"
            >
              <MessageCircle className="size-4" />
              {contactLabel}
            </Button>
            <Button
              className="gap-2 rounded-xl border-[#E2E8F0]"
              onClick={onSave}
              type="button"
              variant="outline"
            >
              <Bookmark className="size-4" />
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
