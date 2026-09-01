import { apiClient } from "./client";

export interface Suggestion {
  label: string;
  type?: string;
}

export interface ListSuggestionsParams {
  q?: string;
  limit?: number;
  signal?: AbortSignal;
}

export async function listSuggestions({
  q = "",
  limit,
  signal,
}: ListSuggestionsParams = {}): Promise<Suggestion[]> {
  const data = await apiClient.get<{ suggestions?: (string | Suggestion)[] }>(
    "/api/artisans/suggestions",
    {
      query: { q, limit },
      signal,
    }
  );

  return (data.suggestions ?? [])
    .map((suggestion) =>
      typeof suggestion === "string" ? { label: suggestion } : suggestion
    )
    .filter((suggestion) => Boolean(suggestion.label));
}
