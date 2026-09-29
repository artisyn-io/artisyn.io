import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthProvider';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Array<'artisan' | 'client' | 'admin'>; // Example roles, adjust as per backend
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Determine if the authenticated user has one of the allowed roles
  const userHasRequiredRole = user && allowedRoles.includes(user.role);

  useEffect(() => {
    // Only redirect if not loading and either not authenticated or lacks required role
    if (!isLoading && (!isAuthenticated || !userHasRequiredRole)) {
      if (!isAuthenticated) {
        router.replace('/login'); // Redirect to login if not authenticated at all
      } else {
        router.replace('/unauthorized'); // Redirect to an unauthorized page if authenticated but wrong role
      }
    }
  }, [isAuthenticated, isLoading, userHasRequiredRole, router]);

  // Render nothing or a loading indicator while authentication state is being determined
  if (isLoading) {
    return null; // Or a loading spinner/skeleton to prevent content flash
  }

  // If not authenticated or lacks required role after loading, the useEffect will handle the redirect.
  // Returning null here prevents rendering protected content before redirect.
  if (!isAuthenticated || !userHasRequiredRole) {
    return null;
  }

  // If authenticated and has required role, render children
  return <>{children}</>;
};
