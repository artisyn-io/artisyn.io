import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { api } from '@/lib/api/client';

// Define User and AuthContext types
interface User {
  id: string;
  email: string;
  role: 'artisan' | 'client' | 'admin'; // Example roles, adjust as per backend
  // Add other user properties as needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.auth.getSession();
      if (response.isAuthenticated && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // Log error but do not expose sensitive details to the user
      console.error('Failed to fetch session:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Bootstrap session on component mount
    fetchSession();
  }, [fetchSession]);

  const login = useCallback(async (credentials: any) => {
    setIsLoading(true);
    try {
      await api.auth.login(credentials); // This should establish a server-side session (e.g., set a cookie)
      await fetchSession(); // Re-fetch session to update local state based on server
      // Optionally redirect after successful login, e.g., router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error; // Re-throw to allow UI components to handle login errors
    } finally {
      setIsLoading(false);
    }
  }, [fetchSession]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.auth.logout(); // This should clear the server-side session
      setIsAuthenticated(false);
      setUser(null);
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const refreshSession = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  const memoizedValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      login,
      logout,
      refreshSession,
    }),
    [isAuthenticated, isLoading, user, login, logout, refreshSession]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
