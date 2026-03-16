// Vercel trigger comment - re-deploying after auth migration
import axios from "axios";

// Backend URL
// Backend URL
// Automatically use the host's IP for local network testing if VITE_API_URL isn't set.
const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const defaultApi = host === 'localhost' ? 'http://localhost:5000/api' : `http://${host}:5000/api`;
const BASE_URL = import.meta.env.VITE_API_URL || defaultApi;

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// ✅ REQUEST INTERCEPTOR (Add Authorization Header for mobile Safari/WebKit 3rd party cookie issues)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ✅ CHANGED: Clear localStorage items instead of cookie
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminEmail");
      
      // Only redirect if not already on a login page
      const path = window.location.pathname;
      if (!path.includes("/login") && !path.includes("/signup")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
