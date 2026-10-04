import { apiClient } from "./client";

export type CuratorVerificationStatus = "pending" | "approved" | "rejected";

export interface CuratorVerificationSubmission {
	id: string;
	status: CuratorVerificationStatus;
	submittedAt: string;
}

export interface CuratorVerificationRequest extends CuratorVerificationSubmission {
	fullName: string;
	email: string;
	specialization: string;
	experienceYears: string;
	statement: string;
	documents: string[];
	note?: string;
	decidedAt?: string;
}

export const CURATOR_VERIFICATION_SUBMIT_ENDPOINT =
  "/api/curator/verification/submit";

/** Submit a curator verification application as a multipart payload. */
export async function submitCuratorVerification(
  payload: FormData
): Promise<CuratorVerificationSubmission> {
  return apiClient.post<CuratorVerificationSubmission>(
    CURATOR_VERIFICATION_SUBMIT_ENDPOINT,
    payload
  );
}

export async function fetchCuratorVerificationQueue(): Promise<CuratorVerificationRequest[]> {
	return apiClient.get<CuratorVerificationRequest[]>("/api/admin/curator-verifications");
}

export async function decideCuratorVerification(payload: {
	id: string;
	action: "approve" | "reject";
	note: string;
}): Promise<CuratorVerificationRequest> {
	return apiClient.patch<CuratorVerificationRequest>(
		"/api/admin/curator-verifications",
		payload,
	);
}
