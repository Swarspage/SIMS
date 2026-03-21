// Vercel trigger comment - re-deploying after auth migration
import axios from "axios";

// Backend URL
// In production (Vercel), use a relative /api path — Vercel reverse proxy forwards it to Render.
// In local dev, hit localhost:5000 directly.
const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const isLocalhost = host === 'localhost';
const BASE_URL = import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:5000/api' : '/api');

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
      // Read role BEFORE clearing storage, to redirect to correct login page
      const role = localStorage.getItem("role");

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminEmail");

      // Redirect to the correct login page based on role
      const path = window.location.pathname;
      if (!path.includes("/login") && !path.includes("/signup")) {
        if (role === "admin") {
          window.location.href = "/admin/login";
        } else if (role === "division" || role === "divisionIncharge") {
          window.location.href = "/division/login";
        } else {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
