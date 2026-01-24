"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const Footer = () => {
    return (
        <footer
            className="text-white pt-10 pb-40 px-6"
            style={{ backgroundImage: 'linear-gradient(180deg, #212121 0%, #100F0F 100%)' }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
                    <h2 className="text-4xl md:text-5xl font-bold max-w-md leading-tight">
                        Craftsmanship You <br className="hidden md:block" /> Can Trust
                    </h2>
                    <div className="flex flex-wrap gap-[8px]">
                        <button className="w-[217px] h-[44px] bg-[#605DEC] hover:opacity-90 transition-opacity rounded-[12px] flex items-center justify-center font-medium shadow-lg text-white">
                            Find a Trusted Artisan
                        </button>
                        <button className="w-[197px] h-[44px] bg-[#FFFFFF] text-[#605DEC] hover:bg-slate-100 transition-colors rounded-[12px] flex items-center justify-center font-medium shadow-lg cursor-pointer">
                            Apply as an Artisan
                        </button>
                    </div>
                </div>

                {/* Brand and Links Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="">
                            <Image
                                src="/atisyn-logo.png"
                                alt="Artisyn Logo"
                                width={100}
                                height={100}
                                className="object-contain brightness-0 invert"
                            />
                        </div>

                    </div>

                    <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[#D9D9D9] font-medium">
                        <Link href="#" className="hover:text-white transition-colors">How It Works</Link>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                            <span>Categories</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <Link href="#" className="hover:text-white transition-colors">For Artisans</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#6B6878]">
                    <p>© 2026 Artisyn. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
