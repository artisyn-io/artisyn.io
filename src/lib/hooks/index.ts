/**
 * Reusable data hooks.
 *
 * Every hook returns the {@link QueryResult} shape (`data`, `isLoading`,
 * `error`, `refetch`) plus a domain alias for `data` and, where relevant, a
 * mutation with its own `is*` and `*Error` flags.
 */

export {
  getErrorMessage,
  isAbortError,
  useQuery,
  type QueryFetcher,
  type QueryOptions,
  type QueryResult,
  type UseQueryResult,
} from './useQuery';

export { useJobs, type UseJobsOptions, type UseJobsResult } from './useJobs';

export {
  useApplications,
  type UseApplicationsOptions,
  type UseApplicationsResult,
} from './useApplications';

export {
  useProfile,
  type UseProfileOptions,
  type UseProfileResult,
} from './useProfile';
