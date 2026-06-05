import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Wallet } from "lucide-react";

import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "For Artisans | Artisyn",
  description:
    "Learn how Artisyn helps artisans get discovered, build trust, and apply to join the platform.",
};

const BENEFITS = [
  {
    title: "Get discovered",
    description:
      "Create a profile that helps nearby clients understand what you do and why they should trust your work.",
    icon: BadgeCheck,
  },
  {
    title: "Build trust",
    description:
      "Use clearer reputation signals so strong clients can choose faster and with more confidence.",
    icon: ShieldCheck,
  },
  {
    title: "Get paid clearly",
    description:
      "Artisyn is designed to support better expectations around scope, trust, and payment flow.",
    icon: Wallet,
  },
];

const STEPS = [
  "Create your artisan profile",
  "Add your experience and service details",
  "Apply and start building visibility",
];

export default function ForArtisansPage() {
  return (
    <main className="min-h-screen bg-white text-[#0F172A]">
      <div className="h-20" />

      <section className="px-6 py-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605DEC]">
            For Artisans
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            A simpler way to present your work and earn client trust.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
            Artisyn gives artisans a clearer way to show what they do, build
            confidence with clients, and move toward better opportunities.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#605DEC] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4F46E5]"
              href="/profile-setup"
            >
              Apply as an Artisan
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-[#D7DEEA] px-5 py-3 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F8FAFC]"
              href="/how-it-works"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EAEFF5] px-6 py-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605DEC]">
              Benefits
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              What this page should answer quickly
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {BENEFITS.map(({ description, icon: Icon, title }) => (
              <article
                className="rounded-xl border border-[#E2E8F0] p-5"
                key={title}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#F5F7FB] text-[#605DEC]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#EAEFF5] px-6 py-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605DEC]">
              Apply
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Joining should feel straightforward
            </h2>
            <p className="mt-3 text-base leading-7 text-[#64748B]">
              The goal is not to overwhelm people. It is to make the next step
              feel clear.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                className="rounded-xl border border-[#E2E8F0] p-5"
                key={step}
              >
                <p className="text-sm font-semibold tracking-[0.18em] text-[#94A3B8]">
                  0{index + 1}
                </p>
                <p className="mt-4 text-lg font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#EAEFF5] px-6 py-12 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-xl bg-[#F8FAFC] p-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605DEC]">
              Ready
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Ready to join as an artisan?
            </h2>
            <p className="mt-3 text-base leading-7 text-[#64748B]">
              Start your onboarding flow and set up your artisan profile.
            </p>
          </div>

          <Link
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#605DEC] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4F46E5]"
            href="/profile-setup"
          >
            Apply as an Artisan
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
