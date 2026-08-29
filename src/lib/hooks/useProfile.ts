'use client';

import { useCallback, useState } from 'react';

import {
  fetchArtisanProfile,
  updateArtisanProfile,
  type ArtisanProfile,
} from '@/lib/api/profile';

import { getErrorMessage, useQuery, type QueryResult } from './useQuery';

export interface UseProfileOptions {
  /** Set to false to skip the request. */
  enabled?: boolean;
}

export interface UseProfileResult extends QueryResult<ArtisanProfile | null> {
  /** Alias of `data`; null until the profile has loaded. */
  profile: ArtisanProfile | null;
  /** Persists a partial update and refreshes the cached profile. */
  updateProfile: (changes: Partial<ArtisanProfile>) => Promise<ArtisanProfile>;
  /** True while an update is in flight. */
  isSaving: boolean;
  /** Message for the last failed update, otherwise null. */
  saveError: string | null;
}

/**
 * Loads the artisan profile and exposes the update mutation.
 *
 * ```tsx
 * const { profile, isLoading, error, updateProfile } = useProfile();
 * ```
 */
export function useProfile(options: UseProfileOptions = {}): UseProfileResult {
  const { enabled = true } = options;

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchArtisanProfile(signal),
    [],
  );

  const { data, isLoading, error, refetch, setData } = useQuery<
    ArtisanProfile | null
  >(fetcher, null, { enabled });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateProfile = useCallback(
    async (changes: Partial<ArtisanProfile>) => {
      setIsSaving(true);
      setSaveError(null);

      try {
        const updated = await updateArtisanProfile(changes);
        setData(updated);
        return updated;
      } catch (err) {
        setSaveError(getErrorMessage(err, 'Failed to update profile.'));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [setData],
  );

  return {
    data,
    profile: data,
    isLoading,
    error,
    refetch,
    updateProfile,
    isSaving,
    saveError,
  };
}
