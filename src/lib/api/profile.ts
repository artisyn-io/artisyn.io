import { apiClient } from "./client";

/**
 * Persists a profile payload to the backend.
 * Accepts the partial profile shape used across onboarding/setup flows and
 * returns the server's persisted representation.
 */
export type ProfilePayload = Record<string, unknown>;
export type ProfileResponse = Record<string, unknown>;

export async function saveProfile(
  payload: ProfilePayload
): Promise<ProfileResponse> {
  return apiClient.post<ProfileResponse>("/api/profile", payload);
}
