import axios from "axios";

// Backend URL
// Backend URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// ✅ REQUEST INTERCEPTOR - Read from localStorage (NOT cookie)
API.interceptors.request.use(
  (config) => {
    // ✅ CHANGED: Get token from localStorage instead of cookie
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ✅ CHANGED: Clear localStorage instead of cookie
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
