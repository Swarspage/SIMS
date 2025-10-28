import API from "../api/axios";

export const studentService = {
  // Import Excel (Admin only)
  importExcel: async (file) => {
    const formData = new FormData();
    formData.append("studentData", file);
    const response = await API.post("/student/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Add student details (Student)
  addStudent: async (studentData, photoFile) => {
    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      formData.append(key, studentData[key]);
    });
    if (photoFile) {
      formData.append("studentPhoto", photoFile);
    }
    const response = await API.post("/student", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update student (Student or Admin)
  updateStudent: async (studentId, studentData, photoFile) => {
    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      formData.append(key, studentData[key]);
    });
    if (photoFile) {
      formData.append("studentPhoto", photoFile);
    }
    const response = await API.put(`/student/${studentId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete student
  deleteStudent: async (studentId) => {
    const response = await API.delete(`/student/${studentId}`);
    return response.data;
  },

  // Get students with search/pagination
  getStudents: async (params) => {
    const response = await API.get("/student", { params });
    return response.data;
  },

  // Get all students (Admin only)
  getAllStudents: async () => {
    const response = await API.get("/student/all");
    return response.data;
  },

  // Get logged-in student's own data
  getMyData: async () => {
    const response = await API.get("/student/me");
    return response.data;
  },

  // Get single student by ID (Admin)
  getSingleStudent: async (studentId) => {
    const response = await API.get(`/student/${studentId}`);
    return response.data;
  },
};
