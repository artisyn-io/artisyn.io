"use client";
import { motion } from "framer-motion";
import { BadgeCheck, Crown, MapPin } from "lucide-react";
import { artisanProps } from "../../features/landing-page/search-grid-section";

export function ArtisanCard({ artisan }: { artisan: artisanProps }) {
  const bg = artisan.image;

  return (
    <motion.div
      style={{ "--bg-image": `url(${bg})` } as React.CSSProperties}
      className="shadow-md hover:cursor-pointer bg-(image:--bg-image) bg-center bg-cover relative flex flex-col justify-end h-72 max-w-62 w-full rounded-xl p-3 overflow-hidden group"
      whileHover={{ boxShadow: "0 20px 25px -5px rgb(96, 93, 236, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/20 group-hover:bg-black/40"
        transition={{ duration: 0.3 }}
      />

      {artisan.rate && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-[#ffffff21] p-2 rounded-lg absolute top-3 flex items-center gap-2 text-[12px]/4 font-semibold text-[#F845FC] backdrop-blur-sm z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="size-4" />
          </motion.div>
          Top Rated
        </motion.span>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        whileHover={{ y: -4 }}
        className="bg-white p-3 rounded-lg text-[#64748B] text-sm font-normal relative z-10"
      >
        <motion.h3
          className="flex items-center gap-1 text-[#020817] text-base font-bold"
          whileHover={{ color: "#605DEC" }}
        >
          {artisan.name}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <BadgeCheck className="text-[#605DEC] size-4" />
          </motion.div>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 mt-4"
        >
          {artisan.icon} {artisan.category}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex items-center gap-2 mt-2"
        >
          <MapPin className="text-[#64748B] size-4" /> {artisan.location}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
