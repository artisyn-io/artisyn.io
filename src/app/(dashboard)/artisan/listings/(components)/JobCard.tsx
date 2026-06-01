"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import bgImg from "../(assets)/bg.png";
import JobFilter from "./JobFilters";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";

interface Job {
  id: string;
  title: string;
  category: string;
  budget: string;
  location: string;
  shortDescription: string;
  urgency: "low" | "medium" | "high";
  icon: string;
}

const JobCard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    search: string;
    role: string | null;
    urgency: string | null;
  }>({ search: "", role: null, urgency: null });


  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/jobs/listings", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load available jobs");
        }
        const data = await res.json();
        const jobsData: Job[] = data.jobs ?? [];
        setJobs(jobsData);
        setRoles(Array.from(new Set(jobsData.map((job) => job.title))));
      } catch (err) {
        console.error(err);
        setError("Unable to load jobs at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const result = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
        job.shortDescription
          .toLowerCase()
          .includes(activeFilters.search.toLowerCase());

      const matchesRole = activeFilters.role
        ? job.title.toLowerCase().includes(activeFilters.role.toLowerCase())
        : true;

      const matchesUrgency = activeFilters.urgency
        ? job.urgency === activeFilters.urgency
        : true;

      return matchesSearch && matchesRole && matchesUrgency;
    });

    setFilteredJobs(result);
  }, [jobs, activeFilters]);

  const handleFilterChange = (filters: {
    search: string;
    role: string | null;
    urgency: string | null;
  }) => {
    setActiveFilters(filters);
  };

  return (
    <div>
      {/* Suspense is required, useSearchParams needs it */}
      <Suspense fallback={<div className="text-sm text-gray-400">Loading filters...</div>}>
        <JobFilter onFilterChange={handleFilterChange} roles={roles} />
      </Suspense>
      
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">Loading jobs...</div>
      ) : error ? (
        <div className="py-10 text-center text-sm text-red-500">{error}</div>
      ) : (
        <div className="mt-8">
          {filteredJobs.map((info) => (
            <div key={info.id} className="flex mb-4 lg:flex-row md:flex-row flex-col">
              <div className="lg:w-[12%] md:w-[20%] w-full lg:mr-6 md:mr-4 mr-0">
                <Image
                  src={bgImg}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>

              <div className="lg:w-[70%] md:w-[70%] w-full flex flex-col lg:my-0 md:my-0 my-3">
                <div className="flex lg:justify-between lg:items-center md:justify-between md:items-center lg:flex-row md:flex-row flex-col gap-3">
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="text-[12px] text-[#212121]">Posted 2 mins ago</p>
                      <JobStatusBadge status="available" size="sm" />
                    </div>
                    <h2 className="lg:text-[20px] md:text-[18px] text-[16px] font-semibold">
                      {info.shortDescription}
                    </h2>
                  </div>
                  <button
                    onClick={() => alert("Application sent!")}
                    className="border rounded-md py-2 hover:bg-black hover:text-white text-[14px] px-6 g:my-0 md:my-0 my-3"
                  >
                    Apply
                  </button>
                </div>

                <div className="text-[14px] flex justify-between lg:items-center md:items-center mt-auto text-[#777679] flex-col lg:flex-row md:flex-row">
                  <p>
                    Category: {info.category} <span className="mx-4">|</span>
                  </p>
                  <p>
                    Compensation: {info.budget} <span className="mx-4">|</span>
                  </p>
                  <p>
                    Location: {info.location} <span className="mx-4">|</span>
                  </p>
                  <p>
                    Urgency:{" "}
                    <span className="uppercase text-red-500">{info.urgency}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No jobs match your filters
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;
