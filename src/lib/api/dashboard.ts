/**
 * Dashboard API service
 * Fetches artisan dashboard metrics from the backend.
 */

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * Fetches dashboard metrics for the authenticated artisan.
 * Throws an error if the request fails or the response is not OK.
 */
export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const res = await fetch(`${API_BASE_URL}/api/artisan/dashboard/metrics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Include credentials (cookies/session) for authenticated requests
    credentials: "include",
    // Opt out of Next.js full-route cache so data is always fresh
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch dashboard metrics: ${res.status} ${res.statusText}`
    );
  }

  const json: DashboardApiResponse = await res.json();

  if (!json.success) {
    throw new Error(json.message ?? "Unexpected error fetching dashboard metrics");
  }

  return json.data;
}
