"use client"

import { CircleUserRound, BriefcaseBusiness } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AccountType } from "@/app/(auth)/profile-setup/page"
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
    <div className="space-y-[24px] sm:space-y-[32px]">
      <SlideInFromBottom delay={0.1} duration={0.45}>
        <div className="space-y-[8px] sm:space-y-[12px]">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#020817] tracking-tight">
            Choose your account type
          </h1>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6B6878] mb-[24px] sm:mb-[32px] md:mb-[5vh]">
            Select how you want to use Artisyn. You can change this later.
          </p>
        </div>
      </SlideInFromBottom>

      <SlideInFromBottom delay={0.25} duration={0.45}>
        <div className="flex flex-col gap-[12px] sm:gap-[14px]">
          <button
            type="button"
            onClick={() => onSelect("client")}
            className={cn(
              "w-full px-[16px] sm:px-[20px] py-[16px] sm:py-[20px] rounded-[12px] sm:rounded-[16px] border-[2px] text-left transition-all duration-[200ms] cursor-pointer bg-[transparent] outline-none",
              selectedType === "client"
                ? "border-[#605DEC]"
                : "border-[#E2E8F0] hover:border-[#605DEC] focus:border-[#605DEC]"
            )}
          >
            <div className="flex justify-start items-center gap-x-[12px] sm:gap-x-[14px] mb-[8px] sm:mb-[10px]">
              <div className="flex justify-between items-start rounded-[8px]">
                <CircleUserRound className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#212121]" />
              </div>
              <h3
                className="font-medium text-[#212121] text-[18px] sm:text-[20px] md:text-[24px] tracking-normal"
              >
                I want to hire artisans
              </h3>
            </div>
            <div className="pl-[30px] sm:pl-[34px] md:pl-[36px]">
              <p className="font-normal text-[13px] sm:text-[14px] text-[#6B6878]">
                Find skilled, curated artisans and hire with confidence for your projects.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelect("artisan")}
            className={cn(
              "w-full px-[16px] sm:px-[20px] py-[16px] sm:py-[20px] rounded-[12px] sm:rounded-[16px] border-[2px] text-left transition-all duration-[200ms] cursor-pointer bg-[transparent] outline-none",
              selectedType === "artisan"
                ? "border-[#605DEC]"
                : "border-[#E2E8F0] hover:border-[#605DEC] focus:border-[#605DEC]"
            )}
          >
            <div className="flex justify-start items-center gap-x-[12px] sm:gap-x-[14px] mb-[8px] sm:mb-[10px]">
              <div className="flex justify-between items-start rounded-[8px]">
                <BriefcaseBusiness className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#212121]" />
              </div>
              <h3
                className="font-medium text-[#212121] text-[18px] sm:text-[20px] md:text-[24px] tracking-normal"
              >
                I&apos;m an artisan
              </h3>
            </div>
            <div className="pl-[30px] sm:pl-[34px] md:pl-[36px]">
              <p className="font-normal text-[13px] sm:text-[14px] text-[#6B6878]">
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
            "w-full sm:w-auto px-[32px] sm:px-[40px] md:px-[48px] py-[12px] sm:py-[13px] mt-[24px] sm:mt-[32px] md:mt-[4vh] rounded-[8px] sm:rounded-[10px] font-medium text-[white] font-[500] text-[15px] sm:text-[16px] transition-all duration-[200ms] cursor-pointer",
            "bg-[#605DEC] border-none",
            selectedType ? "hover:bg-[#483bb6]" : "cursor-not-allowed opacity-[0.6]"
          )}
          style={{ boxShadow: "none", border: "none" }}
        >
          Continue as {selectedType === "artisan" ? "Artisan" : selectedType === "client" ? "Client" : "..."}
        </button>
      </SlideInFromBottom>
    </div>
  )
}