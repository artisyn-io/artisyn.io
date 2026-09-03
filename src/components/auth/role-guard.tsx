"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type Role } from "@/context/AuthProvider";
import { dashboardRouteForRole } from "@/lib/navigation";

interface RoleGuardProps {
  /** Roles permitted to view the guarded content. */
  allowedRoles: Role[];
  children: ReactNode;
  /**
   * Optional explicit redirect target for unauthorized users. When omitted,
   * users are sent to the home route appropriate for their own role.
   */
  redirectTo?: string;
}

/**
 * Restricts access to its children to the provided `allowedRoles`.
 *
 * - While the role is being resolved it renders a loader (no redirect flash).
 * - Unauthenticated users are sent to the public home.
 * - Authenticated users whose role is not allowed are redirected to their own
 *   role-appropriate home, so e.g. a client cannot reach artisan-only pages and
 *   an artisan cannot reach client-only pages.
 */
export function RoleGuard({
  allowedRoles,
  children,
  redirectTo,
}: RoleGuardProps) {
  const { role } = useAuth();
  const router = useRouter();

  const authorized = role !== null && allowedRoles.includes(role);

  useEffect(() => {
    if (!authorized) {
      router.replace(redirectTo ?? dashboardRouteForRole(role));
    }
  }, [authorized, role, redirectTo, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        {role === null ? "Loading…" : "Redirecting…"}
      </div>
    );
  }

  return <>{children}</>;
}
