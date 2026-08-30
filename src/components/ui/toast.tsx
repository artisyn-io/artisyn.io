"use client";

import { CheckCircle2, Info, Loader2, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastItem } from "@/context/ToastProvider";

const VARIANT_STYLES: Record<ToastItem["variant"], string> = {
  success: "border-green-200 bg-green-50 text-green-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-gray-200 bg-white text-gray-900",
  loading: "border-gray-200 bg-white text-gray-900",
};

const VARIANT_ICON: Record<ToastItem["variant"], React.ReactNode> = {
  success: <CheckCircle2 className="size-5 shrink-0 text-green-600" />,
  error: <XCircle className="size-5 shrink-0 text-red-600" />,
  info: <Info className="size-5 shrink-0 text-gray-500" />,
  loading: <Loader2 className="size-5 shrink-0 animate-spin text-gray-500" />,
};

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.variant === "error" ? "alert" : "status"}
          aria-live={toast.variant === "error" ? "assertive" : "polite"}
          className={cn(
            "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition-all",
            VARIANT_STYLES[toast.variant],
          )}
        >
          {VARIANT_ICON[toast.variant]}
          <div className="min-w-0 flex-1">
            {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
            {toast.description && (
              <p className="text-sm opacity-90">{toast.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
