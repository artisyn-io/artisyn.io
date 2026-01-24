"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface RightPanelImageProps {
  currentStep: string
}

export function RightPanelImage({ currentStep }: RightPanelImageProps) {
  const getBackgroundImage = () => {
    if (currentStep === "client-form") {
      return "/images/artisan_woman.png"
    }
    return "/images/artisan_woodworker.png"
  }

  return (
    <div className="">
      {/* <AnimatePresence mode="wait"> */}
        {/* <motion.div
          key={getBackgroundImage()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-[50] h-[50]"
        > */}
          <Image
            src={getBackgroundImage()}
            alt="Artisan at work"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 0vw"
            priority
          />
        {/* </motion.div> */}
      {/* </AnimatePresence> */}
    </div>
  )
}

