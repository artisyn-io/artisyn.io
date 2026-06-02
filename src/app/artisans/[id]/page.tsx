import { notFound } from "next/navigation";

import { PortfolioGallery } from "@/components/artisan/portfolio-gallery";
import { PublicProfileHero } from "@/components/artisan/public-profile-hero";
import {
  PublicProfileAboutSection,
  PublicProfileStatsSection,
  type PublicArtisanProfile,
} from "@/components/artisan/public-profile-sections";
import { ReviewList, type Review } from "@/components/reviews/review-list";
import { ReviewSummary } from "@/components/reviews/review-summary";

type ArtisanProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ArtisanProfileRecord = PublicArtisanProfile & {
  portfolio: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  reviews: Review[];
  ratingCounts: {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
  };
};

const artisanProfiles: ArtisanProfileRecord[] = [
  {
    id: "james-emeka",
    name: "James Emeka",
    category: "Plumber",
    location: "Ikeja, Lagos",
    image: "/images/image3.jpg",
    bio: "James handles residential plumbing repairs, bathroom installations, and emergency leak fixes across Lagos. Clients hire him for tidy work, clear estimates, and fast turnarounds.",
    rating: 4.9,
    reviewCount: 36,
    completedJobs: 128,
    responseTime: "Within 1 hour",
    hourlyRate: 45,
    yearsOfExperience: 7,
    skills: ["Leak repair", "Bathroom fitting", "Pipe installation", "Water heaters"],
    verified: true,
    availability: "Available this week",
    portfolio: [
      {
        id: "bathroom-fit",
        src: "/images/image3.jpg",
        alt: "Completed bathroom plumbing work",
      },
      {
        id: "kitchen-pipes",
        src: "/images/image4.jpg",
        alt: "Kitchen pipe installation",
      },
      {
        id: "water-system",
        src: "/images/image5.jpg",
        alt: "Water system maintenance",
      },
    ],
    reviews: [
      {
        id: "review-1",
        rating: 5,
        reviewerName: "Adaora M.",
        createdAt: "2026-05-12",
        comment: "James fixed a long-running leak and explained every step clearly.",
      },
      {
        id: "review-2",
        rating: 5,
        reviewerName: "Kunle A.",
        createdAt: "2026-04-28",
        comment: "Quick response, neat work, and fair pricing.",
      },
    ],
    ratingCounts: { 5: 31, 4: 5 },
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    category: "Barber",
    location: "Yaba, Lagos",
    image: "/images/image2.jpg",
    bio: "Jane is a mobile barber specializing in crisp cuts, grooming packages, and event-ready styling for clients across Yaba and nearby neighborhoods.",
    rating: 4.8,
    reviewCount: 24,
    completedJobs: 92,
    responseTime: "Same day",
    hourlyRate: 30,
    yearsOfExperience: 5,
    skills: ["Haircuts", "Beard grooming", "Home service", "Event grooming"],
    verified: true,
    availability: "Available today",
    portfolio: [
      {
        id: "studio-cut",
        src: "/images/image2.jpg",
        alt: "Fresh haircut style",
      },
      {
        id: "grooming-kit",
        src: "/images/image1.jpg",
        alt: "Barber grooming tools",
      },
    ],
    reviews: [
      {
        id: "review-3",
        rating: 5,
        reviewerName: "David O.",
        createdAt: "2026-05-08",
        comment: "Excellent cut and arrived right on time.",
      },
      {
        id: "review-4",
        rating: 4,
        reviewerName: "Miriam C.",
        createdAt: "2026-04-19",
        comment: "Professional service and very easy to book.",
      },
    ],
    ratingCounts: { 5: 19, 4: 5 },
  },
  {
    id: "grace-fixer",
    name: "Grace Fixer",
    category: "Painter",
    location: "Surulere, Lagos",
    image: "/images/image5.jpg",
    bio: "Grace provides interior painting, color consultation, wall repairs, and clean finishing for apartments, shops, and small offices.",
    rating: 4.7,
    reviewCount: 18,
    completedJobs: 76,
    responseTime: "Within 2 hours",
    hourlyRate: 55,
    yearsOfExperience: 6,
    skills: ["Interior painting", "Wall repair", "Color matching", "Finishing"],
    verified: true,
    availability: "Available next week",
    portfolio: [
      {
        id: "painted-room",
        src: "/images/image5.jpg",
        alt: "Freshly painted room",
      },
      {
        id: "wall-finish",
        src: "/images/image4.jpg",
        alt: "Smooth wall finish",
      },
    ],
    reviews: [
      {
        id: "review-5",
        rating: 5,
        reviewerName: "Bola S.",
        createdAt: "2026-03-30",
        comment: "Grace helped choose the colors and delivered a beautiful finish.",
      },
    ],
    ratingCounts: { 5: 13, 4: 5 },
  },
];

async function getArtisanProfile(id: string) {
  return artisanProfiles.find((artisan) => artisan.id === id);
}

export function generateStaticParams() {
  return artisanProfiles.map((artisan) => ({ id: artisan.id }));
}

export default async function ArtisanProfilePage({
  params,
}: ArtisanProfilePageProps) {
  const { id } = await params;
  const artisan = await getArtisanProfile(id);

  if (!artisan) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <PublicProfileHero
        artisan={{
          name: artisan.name,
          avatar: artisan.image,
          category: artisan.category,
          location: artisan.location,
          verified: artisan.verified,
          rating: artisan.rating,
          reviewCount: artisan.reviewCount,
          completedJobs: artisan.completedJobs,
        }}
      />
      <PublicProfileStatsSection artisan={artisan} />
      <PublicProfileAboutSection artisan={artisan} />

      <section className="bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[#262626]">Portfolio</h2>
          <div className="mt-6">
            <PortfolioGallery images={artisan.portfolio} />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[360px_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-[#262626]">Reviews</h2>
            <div className="mt-6">
              <ReviewSummary
                averageRating={artisan.rating}
                ratingCounts={artisan.ratingCounts}
                totalCount={artisan.reviewCount}
              />
            </div>
          </div>
          <ReviewList reviews={artisan.reviews} isCurator={false} />
        </div>
      </section>
    </main>
  );
}
