import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";

export default function StudentLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <StudentSidebar />
      <div className="flex-1">
        <Header showSearch={false} />
        <Outlet />
      </div>
    </div>
  );
}
