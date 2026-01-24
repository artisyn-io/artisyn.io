import { SearchGridSection } from "@/features/landing-page/search-grid-section";
import ArtisanSection from "@/features/landing-page/artisan-section";
import FaqSection from "@/features/landing-page/faq-section";
import Footer from "@/components/layout/footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Spacer for potential Hero section */}
            <div className="h-20" />
      <SearchGridSection />
            <ArtisanSection />
            <FaqSection />
            <Footer />
        </main>
    );
}
