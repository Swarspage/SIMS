import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <AdminSidebar />
      <div className="flex-1">
        <Header showSearch={true} />
        <Outlet />
      </div>
    </div>
  );
}
