import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  // Check if user is logged in (has token)
  const isAuthenticated = localStorage.getItem("token");

  // Check user role (admin or student)
  const userRole = localStorage.getItem("role");

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role, redirect to their correct dashboard
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  // If everything is correct, show the page
  return children;
}
