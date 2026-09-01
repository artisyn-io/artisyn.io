import { apiClient } from "./client";

export interface NotificationPreferences {
  email: {
    jobAlerts: boolean;
    marketing: boolean;
    security: boolean;
  };
  push: {
    directMessages: boolean;
    jobUpdates: boolean;
  };
  digest: "none" | "daily" | "weekly";
}

export async function getPreferences(): Promise<NotificationPreferences> {
  return apiClient.get<NotificationPreferences>("/api/preferences", {
    cache: "no-store",
  });
}

export async function updatePreferences(
  preferences: NotificationPreferences
): Promise<NotificationPreferences> {
  return apiClient.post<NotificationPreferences>(
    "/api/preferences",
    preferences
  );
}

export async function replacePreferences(
  preferences: NotificationPreferences
): Promise<NotificationPreferences> {
  return apiClient.put<NotificationPreferences>(
    "/api/preferences",
    preferences
  );
}
