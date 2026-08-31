"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useWallet } from "@/context/WalletProvider";

interface AuthGuardProps {
  children: ReactNode;
  /** Route unauthenticated users are redirected to. */
  redirectTo?: string;
}

/**
 * Restricts access to its children to users who have either an established
 * role (persisted from onboarding) or an actively connected wallet.
 *
 * This is a broader check than `RoleGuard`: it only verifies that the user
 * has entered the app through the wallet connection flow, without caring
 * which role they hold. Unauthenticated users are redirected to the connect
 * wallet route so they can start that flow.
 *
 * `isAuthenticated` is checked in addition to `connected` because the wallet
 * provider's connection state is session-only and does not survive a page
 * reload, while the resolved role is persisted in localStorage.
 */
export function AuthGuard({
  children,
  redirectTo = "/connect-wallet",
}: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { connected } = useWallet();
  const router = useRouter();

  const authorized = isAuthenticated || connected;

  useEffect(() => {
    if (!authorized) {
      router.replace(redirectTo);
    }
  }, [authorized, redirectTo, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Redirecting…
      </div>
    );
  }

  return <>{children}</>;
}
