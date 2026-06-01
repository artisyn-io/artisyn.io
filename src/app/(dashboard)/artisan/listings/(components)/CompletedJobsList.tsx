"use client";

import { useEffect, useState } from "react";

interface CompletedJob {
  id: string;
  title: string;
  category: string;
  compensation: string;
  location: string;
  completedAt: string;
  clientName: string;
}

const LIMIT = 5;

const CompletedJobsList = () => {
  const [jobs, setJobs] = useState<CompletedJob[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs?page=${page}&limit=${LIMIT}`);
        if (res.ok) {
          const data = await res.json();
          setJobs(data.jobs ?? []);
          setTotalPages(data.totalPages ?? 1);
        }
      } catch (error) {
        console.error("Failed to fetch completed jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page]);

  if (loading) {
    return <div className="py-10 text-center text-sm text-gray-500">Loading completed jobs...</div>;
  }

  if (jobs.length === 0) {
    return <div className="py-20 text-center text-sm text-gray-500">No completed jobs yet.</div>;
  }

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex lg:justify-between lg:items-center md:justify-between md:items-center lg:flex-row md:flex-row flex-col">
              <div>
                <p className="text-[12px] text-[#212121]">
                  Completed: {new Date(job.completedAt).toLocaleDateString()}
                </p>
                <h2 className="lg:text-[20px] md:text-[18px] text-[16px] font-semibold">{job.title}</h2>
                <p className="text-[14px] text-gray-600 mt-1">{job.clientName}</p>
              </div>
              <span className="inline-block mt-2 lg:mt-0 px-3 py-1 rounded-full text-xs font-medium border bg-green-50 text-green-700 border-green-200">
                Completed
              </span>
            </div>
            <div className="text-[12px] text-[#777679] mt-3 flex flex-col lg:flex-row md:flex-row gap-4">
              <p>Category: {job.category}</p>
              <p>Compensation: {job.compensation}</p>
              <p>Location: {job.location}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border rounded-md disabled:opacity-40 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border rounded-md disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CompletedJobsList;
