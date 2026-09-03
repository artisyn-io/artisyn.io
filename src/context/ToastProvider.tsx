"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ToastViewport } from "@/components/ui/toast";

export type ToastVariant = "success" | "error" | "info" | "loading";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  description?: string;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  /** Milliseconds before auto-dismiss. Pass 0 to require manual dismissal. */
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (variant: ToastVariant, options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const DEFAULT_DURATION: Record<ToastVariant, number> = {
  success: 4000,
  info: 4000,
  error: 6000,
  loading: 0,
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (variant: ToastVariant, options: ToastOptions) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, variant, ...options }]);

      const duration = options.duration ?? DEFAULT_DURATION[variant];
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

/**
 * Global toast hook. Wrap the app once in <ToastProvider> (see app/layout.tsx),
 * then call these from anywhere — form handlers, wallet actions, etc. — for
 * consistent action-outcome feedback.
 */
export function useToast() {
  const { show, dismiss } = useToastContext();

  return useMemo(
    () => ({
      success: (description: string, options?: Omit<ToastOptions, "description">) =>
        show("success", { ...options, description }),
      error: (description: string, options?: Omit<ToastOptions, "description">) =>
        show("error", { ...options, description }),
      info: (description: string, options?: Omit<ToastOptions, "description">) =>
        show("info", { ...options, description }),
      loading: (description: string, options?: Omit<ToastOptions, "description">) =>
        show("loading", { ...options, description }),
      dismiss,
    }),
    [show, dismiss],
  );
}
