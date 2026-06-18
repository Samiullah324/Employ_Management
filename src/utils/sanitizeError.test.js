import { describe, expect, it } from 'vitest';
import { sanitizeAxiosError } from './sanitizeError';

describe('sanitizeAxiosError', () => {
  it('redacts sensitive headers and payload fields from axios errors', () => {
    const error = {
      message: 'Request failed',
      name: 'AxiosError',
      code: 'ERR_BAD_REQUEST',
      config: {
        method: 'post',
        url: '/login',
        baseURL: 'http://localhost:3000/api',
        headers: {
          Authorization: 'Bearer secret-token',
          'Content-Type': 'application/json',
        },
        data: {
          email: 'user@example.com',
          password: 'super-secret',
        },
      },
      response: {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'set-cookie': 'session=abc123',
        },
        data: {
          token: 'leaked-token',
          message: 'Invalid credentials',
        },
      },
    };

    const sanitized = sanitizeAxiosError(error);

    expect(sanitized.config.headers.Authorization).toBe('[REDACTED]');
    expect(sanitized.config.data.password).toBe('[REDACTED]');
    expect(sanitized.config.data.email).toBe('user@example.com');
    expect(sanitized.response.headers['set-cookie']).toBe('[REDACTED]');
    expect(sanitized.response.data.token).toBe('[REDACTED]');
    expect(sanitized.response.data.message).toBe('Invalid credentials');
  });
});
