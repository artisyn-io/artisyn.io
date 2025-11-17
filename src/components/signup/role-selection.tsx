"use client";

import { AccountRole } from "@/types/sigup.types";
import { useState } from "react";
import { Wand2, Search } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: AccountRole) => void;
  isLoading?: boolean;
}

export default function RoleSelection({
  onRoleSelect,
  isLoading = false,
}: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<AccountRole | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Select Account Type
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Options */}
          <div className="grid grid-cols-2 gap-4">
            {/* Curator Option */}
            <button
              type="button"
              onClick={() => setSelectedRole("curator")}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all
                ${
                  selectedRole === "curator"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              aria-pressed={selectedRole === "curator"}
            >
              <Wand2
                size={48}
                className={`mb-3 ${
                  selectedRole === "curator" ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span className="font-semibold text-gray-900">Curator</span>
            </button>

            {/* Finder Option */}
            <button
              type="button"
              onClick={() => setSelectedRole("finder")}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all
                ${
                  selectedRole === "finder"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              aria-pressed={selectedRole === "finder"}
            >
              <Search
                size={48}
                className={`mb-3 ${
                  selectedRole === "finder" ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span className="font-semibold text-gray-900">Finder</span>
            </button>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!selectedRole || isLoading}
            className={`w-full py-3 rounded-full font-semibold transition-all text-base
              ${
                !selectedRole || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
