export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'An unknown error occurred');
  }

  // Handle 204 No Content specifically if the API returns it for some operations
  if (response.status === 204) {
    return null as T; // Or handle as appropriate for your application
  }

  return response.json();
}

export const apiClient = {
  get: <T>(path: string) => fetcher<T>(`/api${path}`),
  post: <T>(path: string, data: any) => fetcher<T>(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  // Add other methods (put, delete, patch) as needed
};
