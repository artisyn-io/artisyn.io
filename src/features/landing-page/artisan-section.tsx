"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArtisanSectionProps {
    image?: string;
}

const ArtisanSection = ({ image = "/artisan.png" }: ArtisanSectionProps) => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-[1072px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-12 leading-tight"
                >
                    For Artisans Who Take <br /> Pride in Their Work
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-[24px] items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-[404px] h-[400px] md:h-[615px] rounded-[12px] overflow-hidden shadow-2xl relative"
                    >
                        <Image
                            src={image}
                            alt="Artisan working"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="w-full md:w-[620px] h-auto md:h-[615px] bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[12px] p-[40px] flex flex-col justify-end text-white shadow-xl"
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold mb-6 leading-snug">
                            Join a curated platform that values craftsmanship, professionalism, and quality work.
                        </h3>
                        <p className="text-indigo-100 text-lg md:text-xl mb-10 leading-relaxed">
                            Get discovered by clients who care about skill and results.
                        </p>
                        <div>
                            <button className="w-[197px] h-[44px] bg-[#FFFFFF] text-[#605DEC] hover:bg-slate-100 transition-colors rounded-[12px] flex items-center justify-center font-medium shadow-lg cursor-pointer">
                                Apply as an Artisan
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ArtisanSection;
