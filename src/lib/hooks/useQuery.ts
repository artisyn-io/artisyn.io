'use client';

import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

/**
 * Shared return shape for every data hook in this folder.
 * Hooks extend it with a domain-specific alias for `data` (for example `jobs`)
 * so pages can destructure whichever name reads better.
 */
export interface QueryResult<TData> {
  /** Latest successfully loaded value, or the hook's initial value. */
  data: TData;
  /** True while a request is in flight or has not run yet. */
  isLoading: boolean;
  /** Human-readable message for the last failed request, otherwise null. */
  error: string | null;
  /** Runs the request again, cancelling any in-flight one. */
  refetch: () => void;
}

export type QueryFetcher<TData> = (signal: AbortSignal) => Promise<TData>;

export interface QueryOptions {
  /** Skip the automatic request, e.g. when a hook is only used to mutate. */
  enabled?: boolean;
}

export interface UseQueryResult<TData> extends QueryResult<TData> {
  /** Lets mutations keep the cached value in sync without a refetch. */
  setData: Dispatch<SetStateAction<TData>>;
}

/** Converts any thrown value into a message that is safe to render. */
export function getErrorMessage(
  error: unknown,
  fallback = 'An unexpected error occurred.',
): string {
  if (error instanceof Error && error.message.trim() !== '') {
    return error.message;
  }
  if (typeof error === 'string' && error.trim() !== '') {
    return error;
  }
  return fallback;
}

/** True when a request was cancelled rather than genuinely failing. */
export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

interface SettledRequest<TData> {
  fetcher: QueryFetcher<TData>;
  reloadKey: number;
}

/**
 * Minimal client-side query primitive: runs `fetcher` whenever it changes and
 * tracks data, loading, and error state. Requests are aborted on unmount and
 * whenever a newer request starts, so a late response never overwrites state.
 *
 * `fetcher` must be memoised with `useCallback`; its identity decides when the
 * query re-runs and when the current result is considered stale.
 */
export function useQuery<TData>(
  fetcher: QueryFetcher<TData>,
  initialData: TData,
  options: QueryOptions = {},
): UseQueryResult<TData> {
  const { enabled = true } = options;

  const [data, setData] = useState<TData>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [settled, setSettled] = useState<SettledRequest<TData> | null>(null);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    void (async () => {
      try {
        const result = await fetcher(controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted && !isAbortError(err)) {
          setError(getErrorMessage(err));
        }
      } finally {
        // An aborted request has already been replaced by a newer one, which
        // reports its own outcome.
        if (!controller.signal.aborted) {
          setSettled({ fetcher, reloadKey });
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [enabled, fetcher, reloadKey]);

  // A query is loading until the request for the current fetcher and reload key
  // has settled, so pages never render data from a previous set of arguments as
  // if it were final.
  const isLoading =
    enabled &&
    (settled === null ||
      settled.fetcher !== fetcher ||
      settled.reloadKey !== reloadKey);

  return { data, isLoading, error, refetch, setData };
}
