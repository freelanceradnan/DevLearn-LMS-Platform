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
        { label: "Dashboard", icon: LayoutDashboard,link:"/dashboard"},
        { label: "Users", icon: Users,link:"/Users"},
        { label: "Invoices", icon: FileText,link:"/Invoices"},
      ],
    },
    {
      group: "Content",
      items: [
        { label: "Create Course", icon: PlusSquare, link:"/createCourse"},
        { label: "Live Courses", icon: Video,link:"/allcourses"},
        { label: "Hero", icon: Image,link:"/heroSection"},
        { label: "FAQ", icon: HelpCircle,link:"/faqSection"},
        { label: "Categories", icon: Grid,link:"/categoriesSection"},
      ],
    },
    {
      group: "Management",
      items: [{ label: "Manage Team", icon: UserCheck,link:"/Manageteam"}],
    },
    {
      group: "Analytics",
      items: [
        { label: "Courses Analytics", icon: BarChart2,link:"/coursesAnalytics"},
        { label: "Orders Analytics", icon: TrendingUp,link:"/ordersAnalytics"},
        { label: "Users Analytics", icon: PieChart,link:"/usersAnalytics"},
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
