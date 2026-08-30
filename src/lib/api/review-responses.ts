import { apiClient } from "./client";

export interface ReviewResponse {
  id: string;
  reviewId: string;
  body: string;
  [key: string]: unknown;
}

interface ReviewResponseEnvelope<T> {
  data?: T;
  success?: boolean;
  error?: string;
}

export async function getReviewResponse(
  reviewId: string
): Promise<ReviewResponse | null> {
  const envelope = await apiClient.get<
    ReviewResponseEnvelope<ReviewResponse | null>
  >(`/api/review-responses/${reviewId}`);
  return envelope.data ?? null;
}

export async function createReviewResponse(
  reviewId: string,
  payload: { body: string }
): Promise<ReviewResponse> {
  const envelope = await apiClient.post<
    ReviewResponseEnvelope<ReviewResponse>
  >(`/api/review-responses/${reviewId}`, payload);
  if (!envelope.data) {
    throw new Error(envelope.error ?? "Failed to create review response");
  }
  return envelope.data;
}

export async function updateReviewResponse(
  reviewId: string,
  payload: { body: string }
): Promise<ReviewResponse> {
  const envelope = await apiClient.put<ReviewResponseEnvelope<ReviewResponse>>(
    `/api/review-responses/${reviewId}`,
    payload
  );
  if (!envelope.data) {
    throw new Error(envelope.error ?? "Failed to update review response");
  }
  return envelope.data;
}

export async function deleteReviewResponse(
  reviewId: string
): Promise<void> {
  await apiClient.delete<void>(`/api/review-responses/${reviewId}`);
}
