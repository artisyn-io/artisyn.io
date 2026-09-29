import { describe, it, expect } from 'vitest';
import { apiClient } from './api-client';
import { server } from '../test/setup';
import { HttpResponse, http } from 'msw';

describe('apiClient', () => {
  it('should make a GET request and return data', async () => {
    server.use(
      http.get('*/api/test-data', () => {
        return HttpResponse.json({ message: 'Success' }, { status: 200 });
      })
    );

    const data = await apiClient.get<{ message: string }>('/test-data');
    expect(data).toEqual({ message: 'Success' });
  });

  it('should handle GET request errors', async () => {
    server.use(
      http.get('*/api/error-data', () => {
        return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
      })
    );

    await expect(apiClient.get('/error-data')).rejects.toThrow('Not Found');
  });

  it('should make a POST request with data', async () => {
    server.use(
      http.post('*/api/submit-data', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ received: body.value }, { status: 200 });
      })
    );

    const data = await apiClient.post<{ received: string }>('/submit-data', { value: 'test' });
    expect(data).toEqual({ received: 'test' });
  });

  it('should handle POST request errors', async () => {
    server.use(
      http.post('*/api/submit-error', () => {
        return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
      })
    );

    await expect(apiClient.post('/submit-error', { value: 'invalid' })).rejects.toThrow('Bad Request');
  });

  it('should handle 204 No Content response gracefully', async () => {
    server.use(
      http.get('*/api/empty-response', () => {
        return new HttpResponse(null, { status: 204 });
      })
    );

    const data = await apiClient.get('/empty-response');
    expect(data).toBeNull();
  });
});
