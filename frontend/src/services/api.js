import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data)
};

// Room APIs
export const roomAPI = {
  getAllRooms: () => api.get('/rooms'),
  getAvailableRooms: () => api.get('/rooms/available'),
  getRoomById: (id) => api.get(`/rooms/${id}`),
  addRoom: (data) => api.post('/rooms', data),
  updateRoom: (id, data) => api.put(`/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/rooms/${id}`)
};

// Booking APIs
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings/my-bookings'),
  getAllBookings: () => api.get('/bookings/all'),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
  updateBookingStatus: (id, status) => api.put(`/bookings/${id}/status`, { status })
};

export default api;
