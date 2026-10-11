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
  MessageSquare,
  PenLine,
  PieChart,
  PlusSquare,
  StarCheck,
  TrendingUp,
  UserCheck,
  UserRoundPen,
  Users,
  Video,
} from "lucide-react";
import { LogoutModal } from "./LogoutModel";
import AdminNavbar from "./AdminNavbar";


export default function AdminLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [OpenLogoutModel,setOpenLogoutModel]=useState(false)
  const [collapsed, setCollapsed] = useState(() => {
  try {
    return localStorage.getItem("admin-sidebar-collapsed") === "true";
  } catch {
    return false;
  }
});
  const menuGroups = [
    {
      group: "Overview",
      items: [
        { label: "Overview", icon: LayoutDashboard,link:"/dashboard"},
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
        { label: "Mentors", icon: UserRoundPen,link:"/mentors"},
        { label: "Policy", icon: PenLine,link:"/policy"},
      ],
    },
    {
      group: "Replies",
      items: [
        { label: "Course Reviews", icon: StarCheck, link:"/courseReviews"},
        { label: "Course Comments", icon: MessageSquare,link:"/courseComments"}
        
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
      <div className="min-h-screen bg-[#FFFFFF] md:flex ">
        <div className="">
          <Sidebar
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
            menuGroups={menuGroups}
            OpenLogoutModel={OpenLogoutModel}
            setOpenLogoutModel={setOpenLogoutModel}
             collapsed={collapsed}
  setCollapsed={setCollapsed}
          />
        </div>

       <div
  className={`flex min-h-screen flex-1 flex-col transition-[padding] duration-200 ease-out ${
    collapsed ? "md:pl-[72px]" : "md:pl-64"
  }`}
>
         <AdminNavbar setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu}/>
           <main className="flex-1 p-6">
            <Outlet />    
          </main>
          {OpenLogoutModel && <LogoutModal OpenLogoutModel={OpenLogoutModel} setOpenLogoutModel={setOpenLogoutModel}/>}
          
        </div>
     
      </div>
     
    </div>
  );
}
