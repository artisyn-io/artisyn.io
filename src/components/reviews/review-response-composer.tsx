"use client";

import { useEffect, useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 1000;
const MIN_LENGTH = 10;

interface ReviewResponse {
  id: string;
  reviewId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
}

interface ReviewResponseComposerProps {
  reviewId: string;
  isCurator: boolean;
}

export function ReviewResponseComposer({
  reviewId,
  isCurator,
}: ReviewResponseComposerProps) {
  const [response, setResponse] = useState<ReviewResponse | null>(null);
  const [mode, setMode] = useState<"view" | "compose" | "edit">("view");
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/review-responses/${reviewId}`);
        const json = await res.json();
        if (!cancelled && json.data) {
          setResponse(json.data);
          setMode("view");
        }
      } catch {
        // Response not found or fetch failed - stay in view mode
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reviewId]);

  const handleSubmit = async () => {
    const trimmed = draft.trim();
    if (trimmed.length < MIN_LENGTH) {
      setError(`Response must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Response must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(`/api/review-responses/${reviewId}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: trimmed }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to save response");
      }

      const json = await res.json();
      setResponse(json.data);
      setMode("view");
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this response?")) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/review-responses/${reviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to delete response");
      }

      setResponse(null);
      setMode("view");
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = () => {
    setDraft(response?.body ?? "");
    setMode("edit");
    setError("");
  };

  const startCompose = () => {
    setDraft("");
    setMode("compose");
    setError("");
  };

  const cancel = () => {
    setMode("view");
    setDraft("");
    setError("");
  };

  const remaining = MAX_LENGTH - draft.length;

  if (loading) {
    return (
      <div className="mt-4 animate-pulse rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="h-3 w-24 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-full rounded bg-slate-200" />
      </div>
    );
  }

  if (mode === "compose" || mode === "edit") {
    return (
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="mb-2 text-xs font-medium text-slate-500">
          {mode === "compose" ? "Write a response" : "Edit response"}
        </p>
        <Textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setError("");
          }}
          placeholder="Write your response..."
          rows={3}
          maxLength={MAX_LENGTH + 100}
          className="min-h-[80px] resize-y text-sm"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs tabular-nums ${
                remaining < 0
                  ? "text-red-600"
                  : remaining < 100
                    ? "text-amber-600"
                    : "text-slate-400"
              }`}
            >
              {remaining} character{remaining === 1 ? "" : "s"} remaining
            </span>
            {remaining < 0 && (
              <span className="text-xs text-red-600">
                (max {MAX_LENGTH})
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancel}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSubmit}
              disabled={
                submitting ||
                draft.trim().length < MIN_LENGTH ||
                draft.trim().length > MAX_LENGTH
              }
            >
              {submitting
                ? "Saving..."
                : mode === "edit"
                  ? "Save"
                  : "Submit"}
            </Button>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }

  if (!response) {
    if (!isCurator) return null;
    return (
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={startCompose}
          className="text-xs text-slate-500"
        >
          Write a response
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-600">
            {response.authorName} &middot; Response
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {response.body}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Updated{" "}
            {new Intl.DateTimeFormat(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(response.updatedAt))}
          </p>
        </div>
      </div>

      {isCurator && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={startEdit}
            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Edit response"
          >
            <Edit3 className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-600 transition-colors"
            aria-label="Delete response"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
