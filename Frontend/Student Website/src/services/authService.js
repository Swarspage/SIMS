import API from "../api/axios";

export const authService = {
  // Student Login
  login: async (studentID, password) => {
    const response = await API.post("/auth/login", { studentID, password });
    return response.data;
  },

  // Admin Login
  adminLogin: async (email, password) => {
    const response = await API.post("/auth/admin-login", { email, password });
    return response.data;
  },

  // Logout (works for both student and admin)
  logout: async () => {
    const response = await API.get("/auth/logout");
    return response.data;
  },
};
