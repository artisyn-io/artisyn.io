"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Role = "artisan" | "client";

interface AuthState {
  /** The current user's role, or null when unknown / not yet determined. */
  role: Role | null;
  /** True once the role has been read from the persistence layer. */
  isLoading: boolean;
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

/**
 * Provides the current user's role to the tree. This is the foundation the
 * route-level guards depend on. The role is persisted in localStorage during
 * onboarding (see `accountType` in `artisan-onboarding-state`).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRole(readRole());
    setIsLoading(false);
  }, []);

  const value: AuthState = {
    role,
    isLoading,
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
