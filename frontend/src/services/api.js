import axios from 'axios';
import { io } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

export const getCampaign = () => api.get('/campaign');
export const getDonors = () => api.get('/donations');
export const getUpdates = () => api.get('/campaign/updates');
export const initiateDonation = (data) => api.post('/donations', data);

export const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  transports: ['websocket'],
  autoConnect: true,
});
