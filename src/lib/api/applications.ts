import { apiClient } from "./client";

export interface Application {
  id: string;
  jobTitle: string;
  applicant: string;
  payload: unknown;
  createdAt: string;
  [key: string]: unknown;
}

export interface CreateApplicationPayload {
  jobTitle: string;
  applicant: string;
  [key: string]: unknown;
}

export async function getApplications(): Promise<Application[]> {
  return apiClient.get<Application[]>("/api/applications");
}

export async function createApplication(
  payload: CreateApplicationPayload
): Promise<Application> {
  return apiClient.post<Application>("/api/applications", payload);
}
