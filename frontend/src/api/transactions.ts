import axios from 'axios';

export const fetchTransactions = (params: any) =>
  axios.get('/transactions', { params });

export const fetchSummary = () =>
  axios.get('/transactions/summary');
