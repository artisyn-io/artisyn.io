/**
 * Jobs API service
 * Typed access to the job endpoints consumed by the artisan dashboard.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export type JobUrgency = 'low' | 'medium' | 'high';

export type JobStatus = 'available' | 'active' | 'applied' | 'completed';

/** Fields every job payload shares, regardless of its status. */
export interface JobBase {
  id: string;
  title: string;
  category: string;
  location: string;
}

/** A job that is still open for applications. */
export interface AvailableJob extends JobBase {
  budget: string;
  shortDescription: string;
  urgency: JobUrgency;
  icon: string;
  status: JobStatus;
}

/** A job the artisan has already delivered. */
export interface CompletedJob extends JobBase {
  compensation: string;
  completedAt: string;
  clientName: string;
}

export type JobRecord = AvailableJob | CompletedJob;

export type JobStatusFilter = 'available' | 'completed';

export interface JobsQuery {
  status?: JobStatusFilter;
  page?: number;
  limit?: number;
}

export interface JobsPage<TJob extends JobRecord = JobRecord> {
  jobs: TJob[];
  total: number;
  page: number;
  totalPages: number;
}

export const DEFAULT_JOBS_LIMIT = 5;

/**
 * Fetches a page of jobs.
 * Throws an error when the request fails so callers can surface it.
 */
export async function fetchJobs<TJob extends JobRecord = JobRecord>(
  query: JobsQuery = {},
  signal?: AbortSignal,
): Promise<JobsPage<TJob>> {
  const { status, page = 1, limit = DEFAULT_JOBS_LIMIT } = query;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (status) {
    params.set('status', status);
  }

  const res = await fetch(`${API_BASE_URL}/api/jobs?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // Include credentials (cookies/session) for authenticated requests
    credentials: 'include',
    // Opt out of the Next.js fetch cache so listings are always fresh
    cache: 'no-store',
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as Partial<JobsPage<TJob>>;
  const jobs = Array.isArray(json.jobs) ? json.jobs : [];

  return {
    jobs,
    total: typeof json.total === 'number' ? json.total : jobs.length,
    page: typeof json.page === 'number' ? json.page : page,
    totalPages:
      typeof json.totalPages === 'number' ? Math.max(1, json.totalPages) : 1,
  };
}
