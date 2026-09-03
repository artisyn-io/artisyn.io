import { apiClient } from "./client";

/**
 * GDPR data-subject request helpers (export + deletion).
 *
 * Mirrors the request/response shape of the other `/api/user/privacy/*`
 * endpoints (see `user.ts`): plain REST resources guarded by the shared
 * `apiClient`, so callers get the same error normalization and envelope
 * handling as the rest of the privacy settings.
 */

export type GdprRequestStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface DataExportRequest {
  id: string;
  status: GdprRequestStatus;
  requestedAt: string;
  completedAt?: string;
  /** Signed, time-limited link to download the export archive once ready. */
  downloadUrl?: string;
  expiresAt?: string;
}

export interface AccountDeletionRequest {
  id: string;
  status: GdprRequestStatus;
  requestedAt: string;
  /** Date the account is scheduled to be permanently deleted. */
  scheduledFor?: string;
  reason?: string;
}

export const DATA_EXPORT_ENDPOINT = "/api/user/privacy/export";
export const ACCOUNT_DELETION_ENDPOINT = "/api/user/privacy/deletion";

/** List all export requests (most recent first) for the current user. */
export async function getExportRequests(): Promise<DataExportRequest[]> {
  return apiClient.get<DataExportRequest[]>(DATA_EXPORT_ENDPOINT, {
    cache: "no-store",
  });
}

/** Kick off a new export of the user's data. */
export async function createExportRequest(): Promise<DataExportRequest> {
  return apiClient.post<DataExportRequest>(DATA_EXPORT_ENDPOINT, {});
}

/** Fetch the current (active or most recent) deletion request, if any. */
export async function getDeletionRequest(): Promise<AccountDeletionRequest | null> {
  return apiClient.get<AccountDeletionRequest | null>(
    ACCOUNT_DELETION_ENDPOINT,
    { cache: "no-store" },
  );
}

/** Request permanent deletion of the account. */
export async function createDeletionRequest(
  reason?: string,
): Promise<AccountDeletionRequest> {
  return apiClient.post<AccountDeletionRequest>(ACCOUNT_DELETION_ENDPOINT, {
    reason,
  });
}

/** Cancel a pending deletion request before it takes effect. */
export async function cancelDeletionRequest(requestId: string): Promise<void> {
  await apiClient.delete<void>(`${ACCOUNT_DELETION_ENDPOINT}/${requestId}`);
}
