import { apiClient } from "./client";

export interface AccountLink {
  id: string;
  name: string;
  connected: boolean;
  email?: string;
  connectedAt?: string;
}

export interface LinkAccountPayload {
  provider: string;
  email: string;
}

export async function getAccountLinks(): Promise<AccountLink[]> {
  return apiClient.get<AccountLink[]>("/api/account-links", {
    cache: "no-store",
  });
}

export async function linkAccount(
  payload: LinkAccountPayload
): Promise<AccountLink[]> {
  return apiClient.post<AccountLink[]>("/api/account-links", payload);
}

export async function unlinkAccount(provider: string): Promise<AccountLink[]> {
  return apiClient.delete<AccountLink[]>("/api/account-links", {
    query: { provider },
  });
}
