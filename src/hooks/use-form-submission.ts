"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/context/ToastProvider";

export type SubmitStatus = "idle" | "pending" | "success" | "error";

interface UseFormSubmissionOptions<T> {
  /** Shown via the global toast on success. Omit to suppress the success toast. */
  successMessage?: string | ((result: T) => string);
  /** Shown via the global toast on failure. Defaults to the thrown error's message. */
  errorMessage?: string | ((error: unknown) => string);
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
}

interface UseFormSubmissionResult<T> {
  status: SubmitStatus;
  isPending: boolean;
  error: string | null;
  /** Runs the action, tracking pending/success/error status and firing toasts. */
  submit: (action: () => Promise<T>) => Promise<T | undefined>;
  reset: () => void;
}

/**
 * Standardizes the pending/success/error lifecycle for form and action
 * submissions across the app, and surfaces outcomes via the global toast
 * system so every form gets consistent feedback for free.
 */
export function useFormSubmission<T = void>(
  options: UseFormSubmissionOptions<T> = {},
): UseFormSubmissionResult<T> {
  const { successMessage, errorMessage, onSuccess, onError } = options;
  const toast = useToast();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  const submit = useCallback(
    async (action: () => Promise<T>) => {
      setStatus("pending");
      setError(null);

      try {
        const result = await action();
        setStatus("success");

        if (successMessage) {
          toast.success(
            typeof successMessage === "function" ? successMessage(result) : successMessage,
          );
        }
        onSuccess?.(result);
        return result;
      } catch (err) {
        const message =
          typeof errorMessage === "function"
            ? errorMessage(err)
            : errorMessage ?? (err instanceof Error ? err.message : "Something went wrong. Please try again.");

        setStatus("error");
        setError(message);
        toast.error(message);
        onError?.(err);
        return undefined;
      }
    },
    [toast, successMessage, errorMessage, onSuccess, onError],
  );

  return { status, isPending: status === "pending", error, submit, reset };
}
