import axios from 'axios';
import { sanitizeAxiosError } from '../utils/sanitizeError';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(sanitizeAxiosError(error)),
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(sanitizeAxiosError(error)),
);

export default api;
