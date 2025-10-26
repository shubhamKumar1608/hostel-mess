import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  if (token) req.headers['Authorization'] = `Bearer ${token}`;
  if (userId) req.headers['user-id'] = userId;
  return req;
});

export default API;
