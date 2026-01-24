"use client";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { ArtisanCard } from "../../components/artisan/artisan-card";
import { artisanProps } from "./search-grid-section";

export function ArtisanGrid({ artisans }: { artisans: artisanProps[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      layout
      className="flex flex-wrap justify-center gap-4 max-w-260 mb-12"
    >
      <AnimatePresence mode="popLayout">
        {artisans.map((artisan, index) => (
          <motion.div
            key={`${artisan.name}-${artisan.category}-${index}`}
            variants={cardVariants}
            layout
            exit="exit"
            className="max-w-62 w-full"
          >
            <ArtisanCard artisan={artisan} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
