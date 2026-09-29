import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  withCredentials: true, // Important for sending and receiving session cookies
});

export const api = {
  // Existing API calls would be here

  auth: {
    /**
     * Fetches the current session status and user data from the server.
     * @returns {Promise<{ isAuthenticated: boolean, user: { id: string, email: string, role: 'artisan' | 'client' | 'admin' } | null }>}
     */
    getSession: async () => {
      const response = await client.get('/auth/session');
      return response.data;
    },
    /**
     * Sends login credentials to the server to establish a session.
     * This function should handle wallet connection, signing, and challenge exchange on the backend.
     * @param {any} credentials - The login payload (e.g., signed message, wallet address).
     */
    login: async (credentials: any) => {
      const response = await client.post('/auth/login', credentials);
      return response.data;
    },
    /**
     * Invalidates the current server session.
     */
    logout: async () => {
      const response = await client.post('/auth/logout');
      return response.data;
    },
  },

  // Other existing API calls
};

export default client;
