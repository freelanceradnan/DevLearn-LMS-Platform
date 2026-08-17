import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <header className="h-15 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center px-6">
          <span className="font-semibold text-gray-700">Navbar</span>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
