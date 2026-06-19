import { afterEach, describe, expect, it } from 'vitest';
import { API_BASE_URL } from './constants';

describe('API_BASE_URL', () => {
  afterEach(() => {
    delete import.meta.env.VITE_API_BASE_URL;
  });

  it('defaults to the Django API v1 base URL', () => {
    expect(API_BASE_URL).toBe('http://localhost:8000/api/v1');
  });
});
