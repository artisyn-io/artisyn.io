"use client"

import { CircleUserRound, BriefcaseBusiness } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AccountType } from "@/app/(onboarding)/artisan/profile-setup/page"
import { SlideInFromBottom } from "@/components/SlideInFromBottom"

interface AccountTypeSelectionProps {
  selectedType: AccountType
  onSelect: (type: AccountType) => void
  onContinue: () => void
}

export function AccountTypeSelection({
  selectedType,
  onSelect,
  onContinue,
}: AccountTypeSelectionProps) {
  return (
    <div className="space-y-8">
      <SlideInFromBottom delay={0.1} duration={0.45}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#020817] tracking-tight">
            Choose your account type
          </h1>
          <p className="text-[#6B6878] mb-[5vh]">
            Select how you want to use Artisyn. You can change this later.
          </p>
        </div>
      </SlideInFromBottom>

      <SlideInFromBottom delay={0.25} duration={0.45}>
        <div className="flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={() => onSelect("client")}
            className={cn(
              "w-full px-[10px] rounded-xl border-2 text-left transition-all duration-200 cursor-pointer bg-transparent outline-none",
              selectedType === "client"
                ? "border-[#605DEC]"
                : "border-[#E2E8F0] hover:border-[#605DEC] focus:border-[#605DEC]"
            )}
          >
            <div className="flex justify-start items-center gap-x-[10px]">
              <div className="flex justify-between items-start rounded-lg">
                <CircleUserRound className="w-5 h-5 text-[#212121]" />
              </div>
              <h3
                className="font-medium text-[#212121] text-[24px] tracking-normal text-center"
              >
                I want to hire artisans
              </h3>
            </div>
            <div className="">
              <p className="font-normal text-sm text-[#6B6878]">
                Find skilled, curated artisans and hire with confidence for your projects.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelect("artisan")}
            className={cn(
              "w-full px-[10px] rounded-xl border-2 text-left transition-all duration-200 cursor-pointer bg-transparent outline-none",
              selectedType === "artisan"
                ? "border-[#605DEC]"
                : "border-[#E2E8F0] hover:border-[#605DEC] focus:border-[#605DEC]"
            )}
          >
            <div className="flex justify-start items-center gap-x-[10px]">
              <div className="flex justify-between items-start rounded-lg">
                <BriefcaseBusiness className="w-5 h-5 text-[#212121]" />
              </div>
              <h3
                className="font-medium text-[#212121] text-[24px] tracking-normal text-center"
              >
                I&apos;m an artisan
              </h3>
            </div>
            <div className="">
              <p className="font-normal text-sm text-[#6B6878]">
                Showcase your skills, get discovered, and work with clients who value quality.
              </p>
            </div>
          </button>
        </div>
      </SlideInFromBottom>

      <SlideInFromBottom delay={0.30} duration={0.40}>
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedType}
          className={cn(
            "px-[2vw] py-[10px] mt-[4vh] rounded-lg font-medium text-[white] font-[500] text-[16px] transition-all duration-200 cursor-pointer",
            "bg-[#605DEC] border-none",
            selectedType ? "hover:bg-[#483bb6]" : "cursor-not-allowed"
          )}
          style={{ boxShadow: "none", border: "none" }}
        >
          Continue as {selectedType === "artisan" ? "Artisan" : selectedType === "client" ? "Client" : "..."}
        </button>
      </SlideInFromBottom>
    </div>
  )
}
