"use client";

import { useState } from "react";
import JobCard from "./JobCard";

const EmptyState = ({ text }: { text: string }) => (
  <div className="py-20 text-center text-sm text-gray-500">
    {text}
  </div>
);

const TabPages = () => {
  const [activeTab, setActiveTab] = useState("available");

  const tabs = [
    { value: "available", label: "Available Jobs" },
    { value: "active", label: "Active Jobs" },
    { value: "applied", label: "Applied" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="w-full">
      <div className="border-b border-[#BDBCDB]">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`
                pb-3 px-1 text-sm font-medium transition-all relative
                ${
                  activeTab === tab.value
                    ? "text-[#605DEC]"
                    : "text-[#6B6878] hover:text-gray-900"
                }
              `}
            >
              {tab.label}
              {activeTab === tab.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#605DEC] shadow-[0_2px_4px_rgba(37,99,235,0.4)]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {activeTab === "available" && <JobCard />}
        {activeTab === "active" && <EmptyState text="No active jobs yet." />}
        {activeTab === "applied" && <EmptyState text="No applied jobs yet." />}
        {activeTab === "completed" && <EmptyState text="No completed jobs yet." />}
      </div>
    </div>
  );
};

export default TabPages;