import API from "../api/axios";

export const achievementService = {
  // Helper to decode JWT and get student ID
  getStudentIdFromToken: () => {
    const token = localStorage.getItem("token");

    console.log("Token from localStorage:", token); // Debug log

    if (!token || token === "logged-in") {
      console.error("Invalid or missing token");
      return null;
    }

    try {
      // JWT has 3 parts separated by dots
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("Token doesn't have 3 parts:", parts.length);
        return null;
      }

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      console.log("Decoded token payload:", payload); // Debug log

      return payload.id || payload.studentId || payload._id || payload.userId;
    } catch (e) {
      console.error("Failed to decode token:", e);
      return null;
    }
  },

  // Create achievement
  createAchievement: async (achievementData) => {
    const response = await API.post("/achievements", achievementData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get achievements by student ID
  getAchievementsByStu: async (studentId) => {
    const response = await API.get(`/achievements/student/${studentId}`);
    return response.data.data; // Return the data array
  },

  // Update achievement
  updateAchievement: async (achievementId, achievementData) => {
    const response = await API.put(
      `/achievements/${achievementId}`,
      achievementData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  // Delete achievement
  deleteAchievement: async (achievementId) => {
    const response = await API.delete(`/achievements/${achievementId}`);
    return response.data;
  },

  // Get all achievements (Admin)
  getAllAchievements: async () => {
    const response = await API.get("/achievements/all");
    return response.data.data;
  },
};
