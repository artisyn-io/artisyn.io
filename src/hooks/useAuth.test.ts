import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import { server } from '../test/setup';
import { HttpResponse, http } from 'msw';

describe('useAuth', () => {
  it('should return initial loading state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should fetch session and set authenticated state if user exists', async () => {
    server.use(
      http.get('*/api/auth/session', () => {
        return HttpResponse.json({ user: { id: '1', email: 'test@example.com', role: 'user' }, expires: '...' }, { status: 200 });
      })
    );

    const { result } = renderHook(() => useAuth());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ id: '1', email: 'test@example.com', role: 'user' });
    expect(result.current.error).toBeNull();
  });

  it('should fetch session and set unauthenticated state if no user', async () => {
    server.use(
      http.get('*/api/auth/session', () => {
        return HttpResponse.json({ user: null, expires: '...' }, { status: 200 });
      })
    );

    const { result } = renderHook(() => useAuth());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle session fetch error', async () => {
    server.use(
      http.get('*/api/auth/session', () => {
        return HttpResponse.json({ message: 'Session expired' }, { status: 401 });
      })
    );

    const { result } = renderHook(() => useAuth());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Session expired');
  });

  it('should log in a user successfully', async () => {
    const { result } = renderHook(() => useAuth());

    // Wait for initial session check to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    server.use(
      http.post('*/api/auth/login', async ({ request }) => {
        const { email, password } = await request.json();
        if (email === 'test@example.com' && password === 'password') {
          return HttpResponse.json({ user: { id: '1', email: 'test@example.com', role: 'user' }, token: 'mock-token' }, { status: 200 });
        }
        return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      })
    );

    const success = await result.current.login('test@example.com', 'password');

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ id: '1', email: 'test@example.com', role: 'user' });
    expect(result.current.error).toBeNull();
  });

  it('should handle login failure', async () => {
    const { result } = renderHook(() => useAuth());

    // Wait for initial session check to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    server.use(
      http.post('*/api/auth/login', () => {
        return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      })
    );

    const success = await result.current.login('wrong@example.com', 'wrong');

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(success).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Invalid credentials');
  });

  it('should log out a user', async () => {
    server.use(
      http.get('*/api/auth/session', () => {
        return HttpResponse.json({ user: { id: '1', email: 'test@example.com', role: 'user' }, expires: '...' }, { status: 200 });
      })
    );

    const { result } = renderHook(() => useAuth());

    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));

    result.current.logout();

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
