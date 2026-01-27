"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { AccountType } from "@/app/(onboarding)/artisan/profile-setup/page"

interface OnboardingSuccessProps {
  accountType: AccountType
}

export function OnboardingSuccess({ accountType }: OnboardingSuccessProps) {
  const isArtisan = accountType === "artisan"

  return (
    <div className="space-y-[12px] sm:space-y-[16px] text-center relative px-[16px] sm:px-0">
      {/* Animated background glow */}
      <motion.div
        className="absolute top-[15%] sm:top-[20%] left-[50%] -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[300px] h-[240px] sm:h-[280px] md:h-[300px] rounded-full bg-[#10b981]/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 12,
          duration: 0.6,
        }}
        className="flex justify-center relative z-10"
      >
        <div className="relative">
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 w-[52px] sm:w-[60px] h-[52px] sm:h-[60px] rounded-full bg-[#10b981]/20"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <div className="w-[52px] sm:w-[60px] h-[52px] sm:h-[60px] rounded-full bg-[#10b981]/10 flex items-center justify-center relative">
            <CheckCircle className="w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] text-[#10b981]" strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-[12px] sm:space-y-[14px] relative z-10"
      >
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-[#1e3a5f] tracking-tight">
          Profile setup complete! 🎉
        </h1>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6b7280] max-w-[340px] sm:max-w-[380px] md:max-w-[400px] mx-auto leading-relaxed">
          {isArtisan
            ? "Your profile is now visible to clients. You can start receiving job opportunities."
            : "You're all set! Start exploring our curated artisans and find the perfect match for your projects."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 pt-[16px] sm:pt-[20px]"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group w-full sm:w-auto px-[32px] sm:px-[40px] md:px-[48px] py-[12px] sm:py-[13px] mt-[24px] sm:mt-[32px] md:mt-[4vh] rounded-[8px] sm:rounded-[10px] font-medium text-[white] font-[500] text-[15px] sm:text-[16px] bg-[#6366f1] hover:bg-[#5558e3] transition-all duration-[200ms] border-[0] cursor-pointer shadow-lg shadow-[#6366f1]/20 hover:shadow-xl hover:shadow-[#6366f1]/30 inline-flex items-center justify-center gap-[8px]"
        >
          {isArtisan ? "Browse Opportunities" : "Find Artisans"}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px]" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  )
}