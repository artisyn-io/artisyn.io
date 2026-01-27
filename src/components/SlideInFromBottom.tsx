"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SlideInFromBottomProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function SlideInFromBottom({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = ""
}: SlideInFromBottomProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}