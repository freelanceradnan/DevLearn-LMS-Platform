import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import {
  BarChart2,
  FileText,
  Grid,
  HelpCircle,
  Image,
  LayoutDashboard,
  Menu,
  PieChart,
  PlusSquare,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import AdminNav from "./AdminNav";

export default function AdminLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuGroups = [
    {
      group: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard },
        { label: "Users", icon: Users },
        { label: "Invoices", icon: FileText },
      ],
    },
    {
      group: "Content",
      items: [
        { label: "Create Course", icon: PlusSquare },
        { label: "Live Courses", icon: Video },
        { label: "Hero", icon: Image },
        { label: "FAQ", icon: HelpCircle },
        { label: "Categories", icon: Grid },
      ],
    },
    {
      group: "Management",
      items: [{ label: "Manage Team", icon: UserCheck }],
    },
    {
      group: "Analytics",
      items: [
        { label: "Courses Analytics", icon: BarChart2 },
        { label: "Orders Analytics", icon: TrendingUp },
        { label: "Users Analytics", icon: PieChart },
      ],
    },
  ];
  return (
    <div>
      <div className="min-h-screen bg-[#FFFFFF] md:flex">
        <div className="">
          <Sidebar
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
            menuGroups={menuGroups}
          />
        </div>

        <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
         <AdminNav setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu}/>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
