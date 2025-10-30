// import axios from "axios";

// // Backend URL - Your senior's backend runs on port 5000
// const BASE_URL = "http://localhost:5000/api";
// const token = "stored from backend";

// // Create axios instance
// const API = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     // "Authorization" : `Bearer ${token}`
//   },
//   withCredentials: true, // ⚠️ SUPER IMPORTANT! Sends cookies automatically
//   timeout: 10000, // 10 second timeout
// });

// // Handle response errors globally
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // If token expired or unauthorized, redirect to login
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

// import axios from "axios";

// // Backend URL - Your senior's backend runs on port 5000
// const BASE_URL = "http://localhost:5000/api";
// const token = "stored from backend";

// // Create axios instance
// const API = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     // "Authorization" : `Bearer ${token}`
//   },
//   withCredentials: true, // ⚠️ SUPER IMPORTANT! Sends cookies automatically
//   timeout: 10000, // 10 second timeout
// });

// // Handle response errors globally
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // If token expired or unauthorized, redirect to login
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

// import axios from "axios";
// import Cookies from "js-cookie"; // ✅ Import cookie library

// // Backend URL
// const BASE_URL = "http://localhost:5000/api";

// // Create axios instance
// const API = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // ⚠️ SUPER IMPORTANT! Sends cookies automatically
//   timeout: 10000, // 10 second timeout
// });

// // ✅ REQUEST INTERCEPTOR - Add token to every request
// API.interceptors.request.use(
//   (config) => {
//     // Get token from cookie
//     const token = Cookies.get("token");

//     // Debug logs
//     console.log("🔍 REQUEST INTERCEPTOR RUNNING");
//     console.log("📦 Token from cookie:", token);

//     // If token exists, add it to Authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(
//         "✅ Authorization header added:",
//         config.headers.Authorization
//       );
//     } else {
//       console.log("❌ No token found in cookie!");
//     }

//     return config;
//   },
//   (error) => {
//     console.error("❌ Request interceptor error:", error);
//     return Promise.reject(error);
//   }
// );

// // ✅ RESPONSE INTERCEPTOR - Handle response errors globally
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // If token expired or unauthorized, redirect to login
//     if (error.response?.status === 401) {
//       Cookies.remove("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from "axios";

// Backend URL
const BASE_URL = "http://localhost:5000/api";

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
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
