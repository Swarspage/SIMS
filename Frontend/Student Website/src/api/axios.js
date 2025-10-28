import axios from "axios";

// Backend URL - Your senior's backend runs on port 5000
const BASE_URL = "http://localhost:5000/api";

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ⚠️ SUPER IMPORTANT! Sends cookies automatically
  timeout: 10000, // 10 second timeout
});

// Handle response errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or unauthorized, redirect to login
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
