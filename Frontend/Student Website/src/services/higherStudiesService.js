import API from "../api/axios";

export const higherStudiesService = {
  // Create higher study
  createHigherStudy: async (higherStudyData, marksheet) => {
    const formData = new FormData();
    Object.keys(higherStudyData).forEach((key) => {
      formData.append(key, higherStudyData[key]);
    });
    if (marksheet) formData.append("marksheet", marksheet);

    const response = await API.post("/higherStudies", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update higher study
  updateHigherStudy: async (higherStudyId, higherStudyData, marksheet) => {
    const formData = new FormData();
    Object.keys(higherStudyData).forEach((key) => {
      formData.append(key, higherStudyData[key]);
    });
    if (marksheet) formData.append("marksheet", marksheet);

    const response = await API.put(
      `/higherStudies/${higherStudyId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  // Delete higher study
  deleteHigherStudy: async (higherStudyId) => {
    const response = await API.delete(`/higherStudies/${higherStudyId}`);
    return response.data;
  },

  // Get own higher studies (Student)
  getOwnHigherStudies: async () => {
    const response = await API.get("/higherStudies/me");
    return response.data;
  },

  // Get all higher studies (Admin)
  getAllHigherStudies: async () => {
    const response = await API.get("/higherStudies");
    return response.data;
  },

  // Get higher studies by student ID
  getHigherStudiesByStudent: async (studentId) => {
    const response = await API.get(`/higherStudies/${studentId}`);
    return response.data;
  },
};
