"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const adminLinks = [
  {
    href: "/admin/curator-verifications",
    label: "Verifications",
    icon: ShieldCheck,
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: MessageSquare,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gray-50 border-r border-gray-300
          transform transition-transform duration-200 ease-in-out
          flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex-1 overflow-y-auto">
          {/* ADMIN Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <LayoutDashboard className="w-5 h-5 text-[#605DEC]" />
              <h2 className="text-base font-semibold text-gray-900">
                Admin Panel
              </h2>
            </div>

            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-tight mb-4">
              MANAGEMENT
            </h3>
            <nav className="space-y-1">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg
                      transition-colors duration-150 text-sm
                      ${
                        active
                          ? "bg-[#F4F3FE] text-[#605DEC] font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
