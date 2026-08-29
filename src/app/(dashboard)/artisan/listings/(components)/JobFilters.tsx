'use client';

import {
  FiBriefcase,
  FiFilter,
  FiScissors,
  FiTool,
  FiTruck,
  FiZap,
} from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { JSX } from 'react';

const iconMap: Record<string, JSX.Element> = {
  FiTool: <FiTool />,
  FiScissors: <FiScissors />,
  FiTruck: <FiTruck />,
  FiZap: <FiZap />,
  FiBriefcase: <FiBriefcase />,
};

type Filters = {
  search: string;
  role: string | null;
  urgency: string | null;
};

interface Props {
  onFilterChange: (filters: Filters) => void;
  roles: string[];
}

const JobFilter = ({ onFilterChange, roles }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState(false);

  // 1. Read filter state FROM the URL
  const filters: Filters = useMemo(
    () => ({
      search: searchParams.get('search') ?? '',
      role: searchParams.get('role') ?? null,
      urgency: searchParams.get('urgency') ?? null,
    }),
    [searchParams],
  );
  // 2. On mount
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const uniqueRoles = roles;

  // 3. Write filter changes TO the URL
  const updateFilters = (newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters };
    const params = new URLSearchParams();

    if (updated.search) params.set('search', updated.search);
    if (updated.role) params.set('roles', updated.role);
    if (updated.urgency) params.set('urgency', updated.urgency);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3 rounded-lg relative flex-col lg:flex-row md:flex-row">
      <div className="lg:w-[35%] md:w-[40%] w-full mb-3 lg:mb-0 md:mb-0">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full pl-3 pr-3 py-2 border rounded-md text-sm"
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>
      <div className="flex items-center relative lg:w-[63%] md:w-[63%] w-full justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              router.push(pathname, { scroll: false });
              onFilterChange({ search: '', role: null, urgency: null });
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${
              !filters.role && !filters.search && !filters.urgency
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>

          {uniqueRoles.slice(0, 6).map((role) => (
              <button
                key={role}
                onClick={() =>
                  updateFilters({ role: filters.role === role ? null : role })
                }
                className={`flex items-center gap-2 px-3 py-2 rounded-md border border-[#E2E8F0] text-sm ${
                  filters.role === role
                    ? 'bg-black text-white'
                    : 'bg-transparent text-gray-700'
                }`}
              >
                <span>{role}</span>
              </button>
          ))}
        </div>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="self-end p-2 border rounded-md"
        >
          <FiFilter />
        </button>

        {openDropdown && (
          <div className="absolute right-4 top-17.5 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">
            <p className="text-sm font-semibold mb-3">More Filters</p>
            {['high', 'medium', 'low'].map((level) => (
              <button
                key={level}
                onClick={() =>
                  updateFilters({
                    urgency: filters.urgency === level ? null : level,
                  })
                }
                className={`text-left px-3 py-2 rounded-md text-sm mb-1 ${
                  filters.urgency === level
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                Urgency: {level.toUpperCase()}
              </button>
            ))}

            {uniqueRoles.length > 4 &&
              uniqueRoles.slice(6).map((role) => (
                  <button
                    key={role}
                    onClick={() =>
                      updateFilters({
                        role: filters.role === role ? null : role,
                      })
                    }
                    className={`text-left px-4 py-2 rounded-md text-sm flex items-center mb-2 ${
                      filters.role === role
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="ml-2">{role}</span>
                  </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilter;
