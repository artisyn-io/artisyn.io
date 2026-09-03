/**
 * Profile API service
 * Typed access to the artisan profile endpoint.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export interface ArtisanProfile {
  fullName: string;
  email: string;
  skillCategory: string;
  state: string;
  city: string;
  yearsOfExperience: string;
  bio: string;
  profileImageUrl: string | null;
}

export const EMPTY_ARTISAN_PROFILE: ArtisanProfile = {
  fullName: '',
  email: '',
  skillCategory: '',
  state: '',
  city: '',
  yearsOfExperience: '',
  bio: '',
  profileImageUrl: null,
};

type UnknownRecord = Record<string, unknown>;

function toRecord(value: unknown): UnknownRecord {
  return typeof value === 'object' && value !== null
    ? (value as UnknownRecord)
    : {};
}

function toStringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

/** Fills in any field the endpoint omits so consumers never handle undefined. */
export function normalizeArtisanProfile(raw: unknown): ArtisanProfile {
  const record = toRecord(raw);

  return {
    fullName: toStringValue(record.fullName),
    email: toStringValue(record.email),
    skillCategory: toStringValue(record.skillCategory),
    state: toStringValue(record.state),
    city: toStringValue(record.city),
    yearsOfExperience: toStringValue(record.yearsOfExperience),
    bio: toStringValue(record.bio),
    profileImageUrl:
      typeof record.profileImageUrl === 'string' ? record.profileImageUrl : null,
  };
}

/** Fetches the profile of the current artisan. */
export async function fetchArtisanProfile(
  signal?: AbortSignal,
): Promise<ArtisanProfile> {
  const res = await fetch(`${API_BASE_URL}/api/profile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    cache: 'no-store',
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  }

  return normalizeArtisanProfile(await res.json());
}

/** Persists a partial profile update and returns the stored profile. */
export async function updateArtisanProfile(
  changes: Partial<ArtisanProfile>,
  signal?: AbortSignal,
): Promise<ArtisanProfile> {
  const res = await fetch(`${API_BASE_URL}/api/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(changes),
    signal,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = toRecord(body).message;
    throw new Error(
      typeof message === 'string' && message.trim() !== ''
        ? message
        : `Failed to update profile: ${res.status} ${res.statusText}`,
    );
  }

  return normalizeArtisanProfile(await res.json());
}
