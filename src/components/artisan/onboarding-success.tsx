"use client"

import { CheckCircle } from "lucide-react"
import type { AccountType } from "@/app/(onboarding)/artisan/profile-setup/page"

interface OnboardingSuccessProps {
  accountType: AccountType
}

export function OnboardingSuccess({ accountType }: OnboardingSuccessProps) {
  const isArtisan = accountType === "artisan"

  return (
    <div className="space-y-[12px] text-center">
      <div className="flex justify-center">
        <div className="w-[60px] h-[60px] rounded-full bg-[#10b981]/10 flex items-center justify-center">
          <CheckCircle className="w-[2vw] h-[2vw] text-[#10b981]" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-[#1e3a5f] tracking-tight">
          Profile setup complete!
        </h1>
        <p className="text-[#6b7280] max-w-sm mx-auto">
          {isArtisan
            ? "Your profile is now visible to clients. You can start receiving job opportunities."
            : "You're all set! Start exploring our curated artisans and find the perfect match for your projects."}
        </p>
      </div>

      <button
        type="button"
        className="px-[2vw] py-[10px] mt-[4vh] rounded-lg font-medium text-[white] font-[500] text-[16px] bg-[#6366f1] hover:bg-[#5558e3] transition-all duration-200 border-[0] cursor-pointer"
      >
        {isArtisan ? "Browse Opportunities" : "Find Artisans"}
      </button>
    </div>
  )
}
