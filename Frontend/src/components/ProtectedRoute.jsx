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

  // If logged in but role is missing from localStorage, it's an inconsistent state
  if (!userRole) {
    localStorage.removeItem("token");
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
