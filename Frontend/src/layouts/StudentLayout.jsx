import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <StudentSidebar mobileOpen={isSidebarOpen} setMobileOpen={setIsSidebarOpen} />
      <div className="flex-1">
        <Header showSearch={false} onMenuButtonClick={() => setIsSidebarOpen(true)} />
        <Outlet />
      </div>
    </div>
  );
}
