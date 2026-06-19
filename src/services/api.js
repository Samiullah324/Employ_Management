import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { sanitizeAxiosError } from '../utils/sanitizeError';

const api = axios.create({
  baseURL: API_BASE_URL,
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
