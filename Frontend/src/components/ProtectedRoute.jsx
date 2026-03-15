import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  // Check user role (admin or student)
  const userRole = localStorage.getItem("role");

  // If role is missing, we consider them not authenticated (or at least, we can't verify role)
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role, redirect to their correct dashboard
  const hasPermission = Array.isArray(requiredRole)
    ? requiredRole.includes(userRole)
    : userRole === requiredRole;

  if (requiredRole && !hasPermission) {
    // Determine the safe dashboard for this user
    let target = "/login";
    if (userRole === "admin" || userRole === "division" || userRole === "division_incharge" || userRole === "divisionIncharge") {
      target = "/admin/dashboard";
    } else if (userRole === "student") {
      target = "/student/dashboard";
    }

    // Only redirect if we're not actually already on that target path (to prevent loops)
    // Note: window.location.pathname check is a safeguard
    if (window.location.pathname !== target) {
      return <Navigate to={target} replace />;
    }
  }

  // If everything is correct, show the page
  return children;
}
