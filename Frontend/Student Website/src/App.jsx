import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import AdminSignUp from "./Pages/AdminSignUp";
import StudentSignUp from "./Pages/StudentSignup";
import LoginPage from "./Pages/LoginPage";

// Admin Pages
import AdminStudentSection from "./Pages/AdminStudentSection";
import AdminActivity from "./Pages/AdminActivity";
import AdminAchievements from "./Pages/AdminAchievement";
import AdminInternship from "./Pages/AdminInternship";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminPlacement from "./Pages/AdminPlacement"; // ← ADD THIS

// Student Pages
import StudentActivity from "./Pages/StudentActivity";
import StudentAdmission from "./Pages/StudentAdmission";
import StudentInformation from "./Pages/StudentInfromation";
import StudentAchievements from "./Pages/StudentAchievements";
import StudentInternship from "./Pages/StudentInternship";
import StudentPlacement from "./Pages/StudentPlacement";
import StudentDashboard from "./Pages/StudentDashboard";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/student/signup" element={<StudentSignUp />} />

        {/* Admin Routes - PROTECTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="admission"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">
                  Admin Admission Coming Soon
                </h1>
              </div>
            }
          />
          <Route path="students" element={<AdminStudentSection />} />
          <Route path="activities" element={<AdminActivity />} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="internships" element={<AdminInternship />} />
          <Route path="placements" element={<AdminPlacement />} />{" "}
          {/* ← CHANGED THIS */}
        </Route>

        {/* Student Routes - PROTECTED */}
        <Route
          path="/student"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="admission" element={<StudentAdmission />} />
          <Route path="information" element={<StudentInformation />} />
          <Route path="activity" element={<StudentActivity />} />
          <Route path="achievements" element={<StudentAchievements />} />
          <Route path="internship" element={<StudentInternship />} />
          <Route path="placement" element={<StudentPlacement />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
