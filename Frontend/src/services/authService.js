import API from "../api/axios";

export const authService = {
  // Student Login
  login: async (studentID, password) => {
    const response = await API.post("/auth/login", { studentID, password });

    // ✅ ADDED: Save token to localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("✅ Token saved to localStorage");
    }

    return response.data;
  },

  // Admin Login
  adminLogin: async (email, password) => {
    const response = await API.post("/auth/admin-login", { email, password });

    // ✅ ADDED: Save token to localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("✅ Token saved to localStorage");
    }

    return response.data;
  },

  // Logout (works for both student and admin)
  logout: async () => {
    const response = await API.get("/auth/logout");

    // ✅ ADDED: Clear token from localStorage
    localStorage.removeItem("token");
    console.log("🗑️ Token removed from localStorage");

    return response.data;
  },
};
