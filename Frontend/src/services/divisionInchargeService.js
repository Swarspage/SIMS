import API from "../api/axios";

export const divisionInchargeService = {
    // Import Division Incharges from Excel
    importExcel: async (file) => {
        const formData = new FormData();
        formData.append("divisionInchargeData", file); // Must match backend multer field name

        const response = await API.post("/divisionIncharge/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        return response.data;
    },

    // Export Division Incharges (Placeholder - requires backend support)
    exportExcel: async () => {
        // NOTE: There is currently no backend endpoint for this. 
        // This is a placeholder structure in case the route is added later.
        // const response = await API.get("/divisionIncharge/export", { responseType: 'blob' });
        // return response.data;
        throw new Error("Export feature not supported by backend yet.");
    }
};
