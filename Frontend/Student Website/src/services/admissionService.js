import API from "../api/axios";

export const admissionService = {
  createAdmission: async (admissionData) => {
    const response = await API.post("/admission", admissionData);
    return response.data;
  },

  getMyAdmissions: async () => {
    const response = await API.get("/admission/my-admissions");
    return response.data.data;
  },

  getAllAdmissions: async () => {
    const response = await API.get("/admission/all"); // ✅ NEW
    return response.data?.data || response.data || [];
  },

  updateAdmission: async (admissionId, admissionData) => {
    const response = await API.put(`/admission/${admissionId}`, admissionData);
    return response.data;
  },

  deleteAdmission: async (admissionId) => {
    const response = await API.delete(`/admission/${admissionId}`);
    return response.data;
  },

  updateAdmissionStatus: async (admissionId, status) => {
    const response = await API.put(`/admission/status/${admissionId}`, {
      status,
    });
    return response.data;
  },
};
