import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
  }
};

// Post services
export const postService = {
  // Public routes
  getPublishedPosts: (params) => api.get('/posts', { params }),
  getPostById: (id) => api.get(`/posts/${id}`),
  
  // Admin routes
  getAllPosts: () => api.get('/posts/admin/all'),
  createPost: (postData) => {
    const formData = new FormData();
    
    // Append all fields to FormData
    Object.keys(postData).forEach(key => {
      if (key === 'images' && Array.isArray(postData[key])) {
        postData[key].forEach((image) => formData.append('images', image));
      } else if (key === 'tags' && Array.isArray(postData[key])) {
        formData.append('tags', JSON.stringify(postData[key]));
      } else if (postData[key] !== null && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });
    
    return api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updatePost: (id, postData) => {
    const formData = new FormData();
    
    Object.keys(postData).forEach(key => {
      if (key === 'featuredImage' && postData[key] instanceof File) {
        formData.append('image', postData[key]);
      } else if (key === 'tags' && Array.isArray(postData[key])) {
        formData.append('tags', JSON.stringify(postData[key]));
      } else if (postData[key] !== null && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });
    
    return api.put(`/posts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deletePost: (id) => api.delete(`/posts/${id}`),
  togglePublish: (id) => api.patch(`/posts/${id}/publish`)
};

export default api;