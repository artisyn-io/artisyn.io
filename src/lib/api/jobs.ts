import { apiClient } from "./client";

export interface Job {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface JobsListResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ListJobsParams {
  page?: number;
  limit?: number;
  [key: string]: string | number | undefined;
}

export async function listJobs(
  params: ListJobsParams = {}
): Promise<JobsListResponse> {
  return apiClient.get<JobsListResponse>("/api/jobs", { query: params });
}
