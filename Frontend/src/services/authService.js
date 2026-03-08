import API from "../api/axios";

export const authService = {
  // Student Login
  login: async (studentID, password) => {
    const response = await API.post("/auth/login", { studentID, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("✅ Token saved to localStorage");
    }

    return response.data;
  },

  // Admin Login
  adminLogin: async (email, password) => {
    const response = await API.post("/auth/admin-login", { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("✅ Token saved to localStorage");
    }

    return response.data;
  },

  // Division Incharge Login (New)
  divisionLogin: async (email, password, division) => {
    // Sending email, password to backend (division param is ignored by backend but kept here if needed for UI state)
    // Using /auth/division-incharge endpoint which correctly includes 'year' in the token payload
    const response = await API.post("/auth/division-incharge", {
      email,
      password,
      division
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("✅ Token saved to localStorage");
    }

    return response.data;
  },

  // Signup
  signup: async (studentID, email, password) => {
    const response = await API.post("/auth/signup", { studentID, email, password });
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await API.post("/auth/forgot-password", { email });
    return response.data;
  },

  // Reset Password
  resetPassword: async (token, newPassword) => {
    const response = await API.post(`/auth/reset-password/${token}`, { newPassword });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await API.get("/auth/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Ensure role is cleared too
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminEmail");
    console.log("🗑️ Token and credentials removed from localStorage");

    return response.data;
  },
};
