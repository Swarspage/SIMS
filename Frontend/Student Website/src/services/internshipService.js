import API from "../api/axios";

export const internshipService = {
  // Create internship
  createInternship: async (internshipData, internshipReport, photoProof) => {
    const formData = new FormData();
    Object.keys(internshipData).forEach((key) => {
      formData.append(key, internshipData[key]);
    });
    if (internshipReport) formData.append("internshipReport", internshipReport);
    if (photoProof) formData.append("photoProof", photoProof);

    const response = await API.post("/internship", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get all internships (Admin)
  getAllInternships: async () => {
    const response = await API.get("/internship/all");
    return response.data;
  },

  // Get own internships (Student)
  getOwnInternships: async () => {
    const response = await API.get("/internship");
    return response.data;
  },

  // Get student internships by admin
  getStudentInternshipsByAdmin: async (studentId) => {
    const response = await API.get(
      `/internship/student-internship-by-admin/${studentId}`
    );
    return response.data;
  },

  // Get single internship
  getSingleInternship: async (internshipId) => {
    const response = await API.get(`/internship/${internshipId}`);
    return response.data;
  },

  // Update internship
  updateInternship: async (
    internshipId,
    internshipData,
    photoProof,
    internshipReport
  ) => {
    const formData = new FormData();
    Object.keys(internshipData).forEach((key) => {
      formData.append(key, internshipData[key]);
    });
    if (photoProof) formData.append("photoProof", photoProof);
    if (internshipReport) formData.append("internshipReport", internshipReport);

    const response = await API.put(`/internship/${internshipId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete internship
  deleteInternship: async (internshipId) => {
    const response = await API.delete(`/internship/${internshipId}`);
    return response.data;
  },
};
