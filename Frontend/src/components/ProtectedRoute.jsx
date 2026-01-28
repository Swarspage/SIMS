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
  const hasPermission = Array.isArray(requiredRole)
    ? requiredRole.includes(userRole)
    : userRole === requiredRole;

  if (requiredRole && !hasPermission) {
    if (userRole === "admin" || userRole === "division" || userRole === "division_incharge") {
      // Handle both "division" (used in user's Login component) and "division_incharge" (used in backend/plan)
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  // If everything is correct, show the page
  return children;
}
