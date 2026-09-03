'use client';

import { useCallback, useState } from 'react';

import {
  createApplication as createApplicationRequest,
  fetchApplications,
  type Application,
  type CreateApplicationInput,
} from '@/lib/api/applications';

import { getErrorMessage, useQuery, type QueryResult } from './useQuery';

export interface UseApplicationsOptions {
  /** Set to false to only use the mutation, e.g. on a job listing page. */
  enabled?: boolean;
}

export interface UseApplicationsResult extends QueryResult<Application[]> {
  /** Alias of `data` for readability at call sites. */
  applications: Application[];
  /**
   * Submits an application and prepends it to the cached list.
   * Rejects with an `ApplicationRequestError` when the endpoint refuses it.
   */
  createApplication: (input: CreateApplicationInput) => Promise<Application>;
  /** True while an application is being submitted. */
  isCreating: boolean;
  /** Message for the last failed submission, otherwise null. */
  createError: string | null;
}

const EMPTY_APPLICATIONS: Application[] = [];

/**
 * Loads the artisan's job applications and exposes the apply mutation.
 *
 * ```tsx
 * const { applications, isLoading, error, createApplication } = useApplications();
 * ```
 */
export function useApplications(
  options: UseApplicationsOptions = {},
): UseApplicationsResult {
  const { enabled = true } = options;

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchApplications(signal),
    [],
  );

  const { data, isLoading, error, refetch, setData } = useQuery<Application[]>(
    fetcher,
    EMPTY_APPLICATIONS,
    { enabled },
  );

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const createApplication = useCallback(
    async (input: CreateApplicationInput) => {
      setIsCreating(true);
      setCreateError(null);

      try {
        const application = await createApplicationRequest(input);
        setData((current) => [
          application,
          ...current.filter((item) => item.id !== application.id),
        ]);
        return application;
      } catch (err) {
        setCreateError(getErrorMessage(err, 'Failed to submit application.'));
        throw err;
      } finally {
        setIsCreating(false);
      }
    },
    [setData],
  );

  return {
    data,
    applications: data,
    isLoading,
    error,
    refetch,
    createApplication,
    isCreating,
    createError,
  };
}
