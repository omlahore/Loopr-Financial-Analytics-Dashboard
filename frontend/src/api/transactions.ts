import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTransactions = (params: any) =>
  api.get('/transactions', { params });

export const fetchSummary = () =>
  api.get('/transactions/summary');
