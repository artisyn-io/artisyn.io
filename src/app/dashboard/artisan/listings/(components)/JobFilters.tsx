"use client";

import { useState } from "react";
import { jobs } from "../dummyjobs";
import { JSX } from "react";
import {
  FiTool,
  FiScissors,
  FiTruck,
  FiZap,
  FiFilter,
  FiBriefcase
} from "react-icons/fi";

const iconMap: Record<string, JSX.Element> = {
  FiTool: <FiTool />,
  FiScissors: <FiScissors />,
  FiTruck: <FiTruck />,
  FiZap: <FiZap />,
  FiBriefcase: <FiBriefcase />
};

type Filters = {
  search: string;
  role: string | null;
  urgency: string | null;
};

interface Props {
  onFilterChange: (filters: Filters) => void;
}

const JobFilter = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    role: null,
    urgency: null,
  });
  const [openDropdown, setOpenDropdown] = useState(false);
  const uniqueRoles = Array.from(new Set(jobs.map((job) => job.title)));

  const updateFilters = (newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg relative">
      <div className="relative w-[35%]">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full pl-3 pr-3 py-2 border rounded-md text-sm"
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => updateFilters({ role: null })}
          className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${
            !filters.role ? "bg-black text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          All
        </button>

        {uniqueRoles.slice(0, 6).map((role) => {
          const job = jobs.find((j) => j.title === role);
          return (
            <button
              key={role}
              onClick={() =>
                updateFilters({ role: filters.role === role ? null : role })
              }
              className={`flex items-center gap-2 px-3 py-2 rounded-md border border-[#E2E8F0] text-sm ${
                filters.role === role
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700"
              }`}
            >
              {job?.icon && iconMap[job.icon]}
              <span>{role}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="ml-auto p-2 border rounded-md"
      >
        <FiFilter />
      </button>

      {openDropdown && (
        <div className="absolute right-4 top-17.5 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm font-semibold mb-3">More Filters</p>
          {["high", "medium", "low"].map((level) => (
            <button
              key={level}
              onClick={() =>
                updateFilters({
                  urgency: filters.urgency === level ? null : level,
                })
              }
              className={`text-left px-3 py-2 rounded-md text-sm mb-1 ${
                filters.urgency === level
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Urgency: {level.toUpperCase()}
            </button>
          ))}

          {uniqueRoles.length > 4 &&
            uniqueRoles.slice(6).map((role) => {
              const job = jobs.find((j) => j.title === role);
              return (
                <button
                  key={role}
                  onClick={() =>
                    updateFilters({ role: filters.role === role ? null : role })
                  }
                  className={`text-left px-4 py-2 rounded-md text-sm flex items-center mb-2 ${
                    filters.role === role
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {job?.icon && iconMap[job.icon]}
                  <span className="ml-2">{role}</span>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default JobFilter;
