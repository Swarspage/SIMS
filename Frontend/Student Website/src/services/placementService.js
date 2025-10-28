import API from "../api/axios";

export const placementService = {
  // Create placement
  createPlacement: async (placementData, placementProof) => {
    const formData = new FormData();
    Object.keys(placementData).forEach((key) => {
      formData.append(key, placementData[key]);
    });
    if (placementProof) formData.append("placementProof", placementProof);

    const response = await API.post("/placement", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update placement
  updatePlacement: async (placementId, placementData, placementProof) => {
    const formData = new FormData();
    Object.keys(placementData).forEach((key) => {
      formData.append(key, placementData[key]);
    });
    if (placementProof) formData.append("placementProof", placementProof);

    const response = await API.put(`/placement/${placementId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete placement
  deletePlacement: async (placementId) => {
    const response = await API.delete(`/placement/${placementId}`);
    return response.data;
  },

  // Get all placements (Admin)
  getAllPlacements: async () => {
    const response = await API.get("/placement/all");
    return response.data;
  },

  // Get own placements (Student)
  getOwnPlacements: async () => {
    const response = await API.get("/placement");
    return response.data;
  },

  // Get student placements by admin
  getStudentPlacementsByAdmin: async (studentId) => {
    const response = await API.get(
      `/placement/student-placement-by-admin/${studentId}`
    );
    return response.data;
  },

  // Get single placement
  getSinglePlacement: async (placementId) => {
    const response = await API.get(`/placement/${placementId}`);
    return response.data;
  },
};
