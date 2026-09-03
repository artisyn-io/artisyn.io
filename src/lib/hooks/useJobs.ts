'use client';

import { useCallback, useState } from 'react';

import {
  DEFAULT_JOBS_LIMIT,
  fetchJobs,
  type JobRecord,
  type JobStatusFilter,
  type JobsPage,
} from '@/lib/api/jobs';

import { useQuery, type QueryResult } from './useQuery';

export interface UseJobsOptions {
  /** Which job collection to load. Defaults to completed jobs. */
  status?: JobStatusFilter;
  /** Page to start on. Defaults to the first page. */
  page?: number;
  /** Page size. Defaults to {@link DEFAULT_JOBS_LIMIT}. */
  limit?: number;
  /** Set to false to skip the request. */
  enabled?: boolean;
}

export interface UseJobsResult<TJob extends JobRecord = JobRecord>
  extends QueryResult<TJob[]> {
  /** Alias of `data` for readability at call sites. */
  jobs: TJob[];
  /** Total number of jobs across all pages. */
  total: number;
  /** Page currently displayed (1-based). */
  page: number;
  /** Number of available pages, always at least 1. */
  totalPages: number;
  /** Loads another page; values below 1 are clamped. */
  setPage: (page: number) => void;
}

const EMPTY_JOBS_PAGE: JobsPage<never> = {
  jobs: [],
  total: 0,
  page: 1,
  totalPages: 1,
};

/**
 * Loads a paginated list of jobs.
 *
 * ```tsx
 * const { jobs, isLoading, error } = useJobs<AvailableJob>({ status: 'available' });
 * ```
 */
export function useJobs<TJob extends JobRecord = JobRecord>(
  options: UseJobsOptions = {},
): UseJobsResult<TJob> {
  const {
    status,
    page: initialPage = 1,
    limit = DEFAULT_JOBS_LIMIT,
    enabled = true,
  } = options;

  const [page, setPage] = useState(Math.max(1, initialPage));

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchJobs<TJob>({ status, page, limit }, signal),
    [status, page, limit],
  );

  const { data, isLoading, error, refetch } = useQuery<JobsPage<TJob>>(
    fetcher,
    EMPTY_JOBS_PAGE,
    { enabled },
  );

  const goToPage = useCallback((next: number) => {
    setPage(Math.max(1, Math.trunc(next)));
  }, []);

  return {
    data: data.jobs,
    jobs: data.jobs,
    total: data.total,
    page,
    totalPages: data.totalPages,
    setPage: goToPage,
    isLoading,
    error,
    refetch,
  };
}
