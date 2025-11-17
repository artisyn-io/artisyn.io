"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, Wallet } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              <span className="text-2xl">🎨</span>rtisyn.io
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition text-sm"
            >
              Home
            </Link>
            <Link
              href="/find-artisans"
              className="text-gray-700 hover:text-gray-900 transition text-sm"
            >
              Find Artisans
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 transition text-sm"
            >
              Login
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isDark ? (
                <Moon size={20} className="text-gray-700" />
              ) : (
                <Sun size={20} className="text-gray-700" />
              )}
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <Wallet size={18} />
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/find-artisans"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
              onClick={() => setIsOpen(false)}
            >
              Find Artisans
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <button className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium justify-center">
              <Wallet size={18} />
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
