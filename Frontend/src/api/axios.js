import axios from "axios";

// Backend URL
const BASE_URL = "https://student-website-backend.onrender.com/api";

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

    // Debug logs
    console.log("🔍 REQUEST INTERCEPTOR RUNNING");
    console.log("📦 Token from localStorage:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header added");
    } else {
      console.log("❌ No token found in localStorage!");
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
