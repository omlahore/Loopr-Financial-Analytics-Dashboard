import axios from 'axios';

// Use Render deployment URL for production
// Use relative URL for development (proxy handles CORS)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://loopr-financial-analytics-dashboard.onrender.com'
  : '';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable credentials for CORS
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses by redirecting to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchTransactions = (params: any) =>
  api.get('/transactions', { params });

export const fetchSummary = () =>
  api.get('/transactions/summary');
