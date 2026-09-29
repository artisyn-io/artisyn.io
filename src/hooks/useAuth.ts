import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
        const session = await apiClient.get<{ user: User | null; expires: string }>('/auth/session');
        if (session.user) {
          setAuthState({ user: session.user, isLoading: false, isAuthenticated: true, error: null });
        } else {
          setAuthState({ user: null, isLoading: false, isAuthenticated: false, error: null });
        }
      } catch (err) {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false, error: (err as Error).message });
      }
    };

    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await apiClient.post<{ user: User; token: string }>('/auth/login', { email, password });
      setAuthState({ user: response.user, isLoading: false, isAuthenticated: true, error: null });
      return true;
    } catch (err) {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false, error: (err as Error).message });
      return false;
    }
  };

  const logout = () => {
    // In a real app, this would call an API endpoint to invalidate the session
    setAuthState({ user: null, isLoading: false, isAuthenticated: false, error: null });
  };

  return { ...authState, login, logout };
}
