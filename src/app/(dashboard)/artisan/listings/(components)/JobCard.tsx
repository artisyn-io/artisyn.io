'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';

import Image from 'next/image';
import { ApplicationRequestError } from '@/lib/api/applications';
import type { AvailableJob } from '@/lib/api/jobs';
import JobFilter from './JobFilters';
import Link from 'next/link';
import bgImg from '../(assets)/bg.png';
import { useApplications, useJobs } from '@/lib/hooks';
import { useWallet } from '@/context/WalletProvider';
import { createApplication } from '@/lib/api/applications';
import { ApiClientError } from '@/lib/api/errors';

type Filters = {
  search: string;
  role: string | null;
  urgency: string | null;
};

type ApplyStatus = {
  state: 'loading' | 'success' | 'duplicate' | 'error';
  message?: string;
};

const NO_FILTERS: Filters = { search: '', role: null, urgency: null };

const JobCard = () => {
  const { jobs, isLoading, error, refetch } = useJobs<AvailableJob>({
    status: 'available',
  });
  // The listing only needs the mutation, so the applications request is skipped.
  const { createApplication } = useApplications({ enabled: false });
  const { publicKey, connected } = useWallet();

  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [statusMap, setStatusMap] = useState<Record<string, ApplyStatus>>({});

  const applyToJob = async (job: AvailableJob) => {
    if (!connected || !publicKey) {
      setStatusMap((s) => ({
        ...s,
        [job.id]: { state: 'error', message: 'Connect your wallet to apply.' },
      }));
      return;
    }

    setStatusMap((s) => ({ ...s, [job.id]: { state: 'loading' } }));

    try {
      await createApplication({
        jobId: job.id,
        jobTitle: job.title,
        jobShortDescription: job.shortDescription,
        location: job.location,
        applicant: publicKey,
      });
      setStatusMap((s) => ({
        ...s,
        [job.id]: { state: 'success', message: 'Application submitted.' },
      }));
    } catch (err) {
      const duplicate =
        err instanceof ApplicationRequestError && err.code === 'duplicate';
      setStatusMap((s) => ({
        ...s,
        [job.id]: {
          state: duplicate ? 'duplicate' : 'error',
          message:
            err instanceof Error
              ? err.message
              : 'Failed to submit application.',
        },
      }));
    }
  };

  const handleFilterChange = useCallback((next: Filters) => {
    setFilters(next);
  }, []);

  const filteredJobs = useMemo(() => {
    const search = filters.search.toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.shortDescription.toLowerCase().includes(search);

      const matchesRole = filters.role
        ? job.title.toLowerCase().includes(filters.role.toLowerCase())
        : true;

      const matchesUrgency = filters.urgency
        ? job.urgency === filters.urgency
        : true;

      return matchesSearch && matchesRole && matchesUrgency;
    });
  }, [jobs, filters]);

  const roles = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.title))),
    [jobs],
  );

  return (
    <div>
      {/* Suspense is required, useSearchParams needs it */}
      <Suspense
        fallback={
          <div className="text-sm text-gray-400">Loading filters...</div>
        }
      >
        <JobFilter onFilterChange={handleFilterChange} roles={roles} />
      </Suspense>

      {isLoading && <p className="mt-8 text-sm text-gray-400">Loading available jobs...</p>}

      {error && (
        <div className="mt-8">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-8">
        {filteredJobs.map((info) => {
          const status = statusMap[info.id];

          return (
            <div
              key={info.id}
              className="flex mb-4 lg:flex-row md:flex-row flex-col"
            >
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
                <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center md:flex-row md:justify-between md:items-center">
                  <div>
                    <p className="text-[12px] text-[#212121]">
                      Posted 2 mins ago
                    </p>
                    <h2 className="lg:text-[20px] md:text-[18px] text-[16px] font-semibold">
                      {info.shortDescription}
                    </h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/artisan/jobs/${info.id}`}
                      className="text-sm font-medium text-[#605DEC] hover:underline"
                    >
                      View details
                    </Link>
                    <button
                      onClick={() => applyToJob(info)}
                      disabled={status?.state === 'loading'}
                      className="border rounded-md py-2 hover:bg-black hover:text-white text-[14px] px-6 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status?.state === 'loading' ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                </div>

                {status?.message && (
                  <p
                    className={`text-[12px] mt-2 ${
                      status.state === 'success'
                        ? 'text-green-600'
                        : status.state === 'duplicate'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {status.message}
                  </p>
                )}

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
                    Urgency:{' '}
                    <span className="uppercase text-red-500">
                      {info.urgency}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {!isLoading && !error && filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No jobs match your filters
          </p>
        )}
      </div>
    </div>
  );
};

export default JobCard;
