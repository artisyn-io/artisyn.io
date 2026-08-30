import { apiClient } from "./client";

export interface PrivacySettings {
  profileVisibility: string;
  showEmail: boolean;
  showEarnings: boolean;
  discoverable: boolean;
  [key: string]: unknown;
}

export interface BlockedUser {
  id: string;
  name: string;
  username?: string;
  blockedAt?: string;
}

/** Candidate endpoints that may serve the current user's blocklist. */
export const BLOCKLIST_ENDPOINTS = [
  "/api/user/privacy/blocklist",
  "/api/privacy/blocklist",
];

export async function getBlockedUsers(): Promise<BlockedUser[]> {
  for (const endpoint of BLOCKLIST_ENDPOINTS) {
    try {
      const data = await apiClient.get<BlockedUser[]>(endpoint, {
        cache: "no-store",
      });
      if (Array.isArray(data)) {
        return data;
      }
    } catch {
      // Try the next candidate endpoint.
    }
  }

  throw new Error("Failed to fetch blocklist");
}

export async function getPrivacySettings(): Promise<PrivacySettings> {
  return apiClient.get<PrivacySettings>("/api/user/privacy");
}

export async function updatePrivacySettings(
  settings: PrivacySettings
): Promise<void> {
  await apiClient.put<void>("/api/user/privacy", settings);
}

export async function unblockUser(userId: string): Promise<void> {
  const attempts = [
    () =>
      apiClient.delete<void>(`/api/user/privacy/blocklist/${userId}`),
    () =>
      apiClient.delete<void>("/api/user/privacy/blocklist", {
        body: { userId },
      }),
  ];

  for (const attempt of attempts) {
    try {
      await attempt();
      return;
    } catch {
      // Try the next candidate endpoint.
    }
  }

  throw new Error("Unable to unblock user");
}
