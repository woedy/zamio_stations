import axios from 'axios';
import { baseUrl } from '../constants';

// Use same-origin by default via Vite proxy or fall back to baseUrl
const api = axios.create({
  baseURL: (import.meta as any)?.env?.VITE_API_BASE || '/',
});

// Attach auth token from storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Token ${token}`;
  }
  return config;
});

// Global 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('station_id');
        localStorage.removeItem('user_id');
      } catch {}
      if (typeof window !== 'undefined' && window.location.pathname !== '/sign-in') {
        window.location.replace('/sign-in');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

