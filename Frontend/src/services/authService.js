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
    // Sending email, password, and selected division to backend
    const response = await API.post("/divisionIncharge/login", {
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
