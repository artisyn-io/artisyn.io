import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthProvider';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, isLoading, router]);

  // Render nothing or a loading indicator while authentication state is being determined
  if (isLoading) {
    return null; // Or a loading spinner/skeleton to prevent content flash
  }

  // If not authenticated after loading, the useEffect will handle the redirect.
  // Returning null here prevents rendering protected content before redirect.
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
};
