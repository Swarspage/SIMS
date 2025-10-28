import API from "../api/axios";

export const activityService = {
  // Create activity
  createActivity: async (formData) => {
    // formData is already a FormData object from component
    const response = await API.post("/activities", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get activities by student ID
  getActivityByStu: async (stuID) => {
    const response = await API.get(`/activities/${stuID}`);
    return response.data;
  },

  // Update activity
  updateActivity: async (id, activityData) => {
    const response = await API.put(`/activities/${id}`, activityData);
    return response.data;
  },

  // Delete activity
  deleteActivity: async (id) => {
    const response = await API.delete(`/activities/${id}`);
    return response.data;
  },

  // Get all activities
  getAllActivities: async () => {
    const response = await API.get("/activities");
    return response.data;
  },
};
