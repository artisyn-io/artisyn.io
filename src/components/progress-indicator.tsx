"use client"

import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex gap-[8px] w-[3vw]">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        
        return (
          <motion.div
            key={index}
            className={`h-[4px] rounded-full transition-all duration-500 ${
              isActive || isCompleted
                ? "bg-[#6366F1]"
                : "bg-[#E5E7EB]"
            }`}
            style={{
              flex: isActive ? "1.5" : "1",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      })}
    </div>
  )
}