/**
 * Dashboard API service
 * Fetches artisan dashboard metrics from the backend.
 */

import { apiClient } from "./client";

export interface DashboardMetrics {
  totalEarnings: string;
  activeJobs: number;
  completedJobs: number;
  averageRating: number;
  profileViews: number;
  searchAppearances: string;
  clientSaves: number;
  proposalResponseRate: number;
  artisanName: string;
}

export interface DashboardApiResponse {
  data: DashboardMetrics;
  success: boolean;
  message?: string;
}

/**
 * Fetches dashboard metrics for the authenticated artisan.
 * Throws an {@link ApiClientError} if the request fails.
 */
export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  return apiClient.get<DashboardMetrics>("/api/artisan/dashboard/metrics", {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
    cache: "no-store",
    envelope: true,
  });
}
