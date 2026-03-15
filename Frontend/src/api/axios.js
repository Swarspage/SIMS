// Vercel trigger comment - re-deploying after auth migration
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
