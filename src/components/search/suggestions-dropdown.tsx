"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

type Suggestion = {
  label: string;
  type?: string;
};

type SuggestionRenderProps = {
  activeDescendantId: string | undefined;
  isExpanded: boolean;
  listboxId: string;
  onBlur: () => void;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

type SuggestionsDropdownProps = {
  children: (props: SuggestionRenderProps) => ReactNode;
  className?: string;
  minQueryLength?: number;
  onSelect: (suggestion: string) => void;
  query: string;
};

const DEBOUNCE_DELAY = 250;

export function SuggestionsDropdown({
  children,
  className,
  minQueryLength = 2,
  onSelect,
  query,
}: SuggestionsDropdownProps) {
  const generatedId = useId();
  const listboxId = `${generatedId}-suggestions`;
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const trimmedQuery = query.trim();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [trimmedQuery]);

  useEffect(() => {
    if (debouncedQuery.length < minQueryLength) return;

    const controller = new AbortController();

    async function loadSuggestions() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/artisans/suggestions?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Could not load artisan suggestions.");
        }

        const data = (await response.json()) as {
          suggestions?: Array<string | Suggestion>;
        };

        const nextSuggestions = (data.suggestions ?? [])
          .map((suggestion) =>
            typeof suggestion === "string" ? { label: suggestion } : suggestion
          )
          .filter((suggestion) => Boolean(suggestion.label));

        setSuggestions(nextSuggestions);
        setActiveIndex(nextSuggestions.length > 0 ? 0 : -1);
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
          setActiveIndex(-1);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadSuggestions();

    return () => controller.abort();
  }, [debouncedQuery, minQueryLength]);

  const isDebouncing = trimmedQuery !== debouncedQuery;
  const visibleSuggestions = useMemo(() => {
    if (debouncedQuery.length < minQueryLength || isDebouncing) {
      return [];
    }

    return suggestions;
  }, [debouncedQuery.length, isDebouncing, minQueryLength, suggestions]);

  const isExpanded =
    isFocused &&
    trimmedQuery.length >= minQueryLength &&
    (visibleSuggestions.length > 0 || isLoading);

  const activeDescendantId = useMemo(() => {
    if (
      !isExpanded ||
      activeIndex < 0 ||
      activeIndex >= visibleSuggestions.length
    ) {
      return undefined;
    }

    return `${listboxId}-${activeIndex}`;
  }, [activeIndex, isExpanded, listboxId, visibleSuggestions.length]);

  const selectSuggestion = useCallback(
    (suggestion: Suggestion) => {
      onSelect(suggestion.label);
      setActiveIndex(-1);
      setIsFocused(false);
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isExpanded || visibleSuggestions.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((currentIndex) =>
          currentIndex >= visibleSuggestions.length - 1 ? 0 : currentIndex + 1
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((currentIndex) =>
          currentIndex <= 0 ? visibleSuggestions.length - 1 : currentIndex - 1
        );
      }

      if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        selectSuggestion(visibleSuggestions[activeIndex]);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setIsFocused(false);
        setActiveIndex(-1);
      }
    },
    [activeIndex, isExpanded, selectSuggestion, visibleSuggestions]
  );

  return (
    <div className={className}>
      {children({
        activeDescendantId,
        isExpanded,
        listboxId,
        onBlur: () => {
          window.setTimeout(() => setIsFocused(false), 100);
        },
        onFocus: () => setIsFocused(true),
        onKeyDown: handleKeyDown,
      })}

      {isExpanded && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg"
        >
          {isLoading && visibleSuggestions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[#64748B]">Searching...</div>
          ) : (
            visibleSuggestions.map((suggestion, index) => (
              <button
                aria-selected={activeIndex === index}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-[#262626] transition-colors hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] focus:outline-none aria-selected:bg-[#EEF2FF]"
                id={`${listboxId}-${index}`}
                key={`${suggestion.type ?? "suggestion"}-${suggestion.label}`}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectSuggestion(suggestion)}
                role="option"
                type="button"
              >
                <span className="truncate">{suggestion.label}</span>
                {suggestion.type && (
                  <span className="shrink-0 rounded-full bg-[#F1F5F9] px-2 py-0.5 text-xs text-[#64748B]">
                    {suggestion.type}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
