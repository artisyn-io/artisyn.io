import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Artisyn",
  description:
    "Read the Artisyn terms and conditions before connecting your wallet and using the platform.",
};

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white px-6 py-10 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8 text-gray-900">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Last updated: June 2, 2026</p>
            <h1 className="text-4xl font-semibold">Terms and Conditions</h1>
            <p className="text-base text-gray-600 leading-7">
              Please read these Terms and Conditions carefully before using the
              Artisyn platform. By connecting your wallet or creating an account,
              you agree to be bound by the terms described below.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-7">
              By accessing or using Artisyn, you confirm that you are at least 18
              years old, have the legal authority to enter into this agreement,
              and accept these Terms and Conditions in full. If you do not agree,
              please do not use the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Platform Description</h2>
            <p className="text-gray-600 leading-7">
              Artisyn is a marketplace that connects clients with skilled local
              artisans. Payments are facilitated through Stellar smart contract
              escrow, providing a transparent and fee-minimal transaction layer
              for both parties.
            </p>
            <p className="text-gray-600 leading-7">
              Artisyn acts solely as an intermediary and is not a party to any
              contract formed between a client and an artisan.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. User Accounts & Wallets</h2>
            <p className="text-gray-600 leading-7">
              To access the full platform, you must connect a compatible Stellar
              wallet (Freighter, Albedo, or Lobstr). You are solely responsible
              for the security of your wallet and private keys. Artisyn will
              never request or store your private keys or seed phrases.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 leading-7">
              <li>You must provide accurate and truthful profile information.</li>
              <li>
                You are responsible for all activity conducted through your
                account.
              </li>
              <li>
                Accounts found to be fraudulent or abusive may be suspended or
                permanently banned.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Payments and Escrow</h2>
            <p className="text-gray-600 leading-7">
              All payments between clients and artisans are held in Stellar smart
              contract escrow until the client confirms job completion. Artisyn
              does not hold funds on your behalf — escrow is governed entirely by
              on-chain contracts.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 leading-7">
              <li>
                Clients must fund escrow before an artisan begins work.
              </li>
              <li>
                Funds are released to the artisan only upon client confirmation.
              </li>
              <li>
                Dispute resolution processes, where available, are governed by
                on-chain logic and platform mediation.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Prohibited Conduct</h2>
            <p className="text-gray-600 leading-7">
              You agree not to use the platform to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 leading-7">
              <li>Post false, misleading, or fraudulent listings or reviews.</li>
              <li>
                Attempt to circumvent escrow or engage in off-platform payments
                to avoid fees or protections.
              </li>
              <li>
                Harass, threaten, or harm other users of the platform.
              </li>
              <li>
                Violate any applicable local, national, or international law.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Reviews and Reputation</h2>
            <p className="text-gray-600 leading-7">
              Reviews submitted on Artisyn are recorded on-chain and contribute
              to an artisan&apos;s verifiable reputation. Reviews must be honest
              and based on genuine experience. Artisyn reserves the right to
              remove reviews that violate community standards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-7">
              To the maximum extent permitted by law, Artisyn shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of the platform, including but not
              limited to loss of funds, data, or business opportunities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
            <p className="text-gray-600 leading-7">
              Artisyn reserves the right to update these Terms and Conditions at
              any time. Continued use of the platform after changes are published
              constitutes acceptance of the updated terms. We will indicate the
              last updated date at the top of this page.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-gray-600 leading-7">
              For questions about these Terms and Conditions, please contact:
            </p>
            <ul className="space-y-1 text-gray-600">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:legal@artisyn.io"
                  className="text-[#605DEC] hover:underline"
                >
                  legal@artisyn.io
                </a>
              </li>
            </ul>
          </section>

          <div className="pt-4 flex gap-4">
            <Link
              href="/"
              className="text-sm text-[#605DEC] hover:underline"
            >
              ← Back to Home
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-[#605DEC] hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
