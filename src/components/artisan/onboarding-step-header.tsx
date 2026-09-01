'use client';

import { ProgressIndicator } from '@/components/progress-indicator';

interface OnboardingStepHeaderProps {
  currentStep: number;
  onBack: () => void;
}

export function OnboardingStepHeader({
  currentStep,
  onBack,
}: OnboardingStepHeaderProps) {
  return (
    <div
      className="w-full flex items-center justify-between px-[8px] sm:px-[12px] md:px-[1vw] mb-[24px] sm:mb-[28px]"
      style={{ maxWidth: 520 }}
    >
      <div className="flex-1">
        <ProgressIndicator currentStep={currentStep} totalSteps={2} />
      </div>
      <button
        onClick={onBack}
        className="
          flex items-center gap-[8px]
          hover:bg-[#ededfb]
          border-none bg-[transparent]
          text-[#6366F1] hover:text-[#4338ca]
          px-[12px] sm:px-[16px] md:px-[18px] py-[6px] sm:py-[7px] rounded-[8px]
          font-medium text-[13px] sm:text-[14px]
          transition-all duration-[200ms]
          group cursor-pointer
        "
      >
        <svg
          className="w-4 sm:w-[18px] h-[16px] sm:h-[18px] mr-[2px] text-[#6366F1] group-hover:text-[#4338ca] transition-colors duration-[150ms]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium">Back</span>
      </button>
    </div>
  );
}
