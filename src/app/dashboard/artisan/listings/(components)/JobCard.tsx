"use client";

import { useState } from "react";
import { jobs } from "../dummyjobs";
import Image from "next/image";
import bgImg from "../(assets)/bg.png";
import JobFilter from "./JobFilters";

const JobCard = () => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleFilterChange = (filters: {
    search: string;
    role: string | null;
    urgency: string | null;
  }) => {
    const result = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.shortDescription
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesRole = filters.role
        ? job.title.toLowerCase().includes(filters.role.toLowerCase())
        : true;

      const matchesUrgency = filters.urgency
        ? job.urgency === filters.urgency
        : true;

      return matchesSearch && matchesRole && matchesUrgency;
    });

    setFilteredJobs(result);
  };

  return (
    <div>
      <JobFilter onFilterChange={handleFilterChange} />
      <div className="mt-6">
        {filteredJobs.map((info, index) => (
          <div key={index} className="flex mb-4">
            <div className="lg:w-[12%] md:w-[20%] mr-6">
              <Image
                src={bgImg}
                alt=""
                width={200}
                height={200}
                className="w-full"
              />
            </div>

            <div className="w-[70%] flex flex-col">
              <div>
                <p className="text-[12px] text-[#212121]">Posted 2 mins ago</p>
                <h2 className="text-[20px] font-semibold">
                  {info.shortDescription}
                </h2>
              </div>

              <div className="text-[14px] flex items-center mt-auto text-[#777679]">
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
    </div>
  );
};

export default JobCard;
