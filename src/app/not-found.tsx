import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Artisyn",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <Image
        src="/account-type/artisyn-logo.svg"
        alt="Artisyn Logo"
        width={80}
        height={80}
        className="mb-8"
      />

      <p className="text-6xl font-bold text-[#605DEC] mb-4">404</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">
        Page not found
      </h1>
      <p className="text-gray-500 text-sm max-w-sm mb-10">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="bg-[#605DEC] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#605DEC]/80 transition-colors"
        >
          Go to Home
        </Link>
        <Link
          href="/artisan"
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:border-[#605DEC] hover:text-[#605DEC] transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
