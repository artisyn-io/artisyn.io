"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Role = "artisan" | "client";

interface AuthState {
  /** The current user's role, or null when unknown / not yet determined. */
  role: Role | null;
  /** Convenience flag derived from `role`. */
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = "artisan-onboarding-state";

function readRole(): Role | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { accountType?: unknown };
    const accountType = parsed?.accountType;
    return accountType === "artisan" || accountType === "client"
      ? accountType
      : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

const getServerSnapshot = (): Role | null => null;

/**
 * Provides the current user's role to the tree. This is the foundation the
 * route-level guards depend on. The role is persisted in localStorage during
 * onboarding (see `accountType` in `artisan-onboarding-state`).
 *
 * `useSyncExternalStore` is used so the value is read from the external store
 * (localStorage) without calling `setState` inside an effect, and the server
 * snapshot is `null` so SSR/hydration stay consistent.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const role = useSyncExternalStore(subscribe, readRole, getServerSnapshot);

  const value: AuthState = {
    role,
    isAuthenticated: role !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
