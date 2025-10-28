import API from "../api/axios";

export const admissionService = {
  createAdmission: async (admissionData) => {
    const response = await API.post("/admission/create", admissionData);
    return response.data;
  },

  getMyAdmissions: async () => {
    const response = await API.get("/admission/my-admissions");
    return response.data.data;
  },

  updateAdmission: async (admissionId, admissionData) => {
    const response = await API.put(
      `/admission/update/${admissionId}`,
      admissionData
    );
    return response.data;
  },

  deleteAdmission: async (admissionId) => {
    const response = await API.delete(`/admission/delete/${admissionId}`);
    return response.data;
  },
};
