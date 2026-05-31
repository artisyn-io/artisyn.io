import { SearchGridSection } from "@/features/landing-page/search-grid-section";
import ArtisanSection from "@/features/landing-page/artisan-section";
import CraftmanshipSection from "@/features/landing-page/craftmanship-section";
import FaqSection from "@/features/landing-page/faq-section";
import Footer from "@/components/layout/footer";
import TestimonialSlider from "@/features/landing-page/testimonial-slider";
import HireCTA from "@/features/landing-page/hire-cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Spacer for potential Hero section */}
      <div className="h-20" />
      <SearchGridSection />
      <div className="bg-white">
        <CraftmanshipSection />
        <TestimonialSlider />
        <HireCTA />
      </div>
      <ArtisanSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
