import { useState } from "react";
import Rootlayout from "./Pages/Rootlayout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import GitHubCallback from "./Pages/GithubCallback";
import Profile from "./Pages/Profile";
import ProfileInfo from "./Components/ProfileInfo";
import UserSecurity from "./Components/UserSecurity";
import AdminProtected from "./Components/AdminProtected";
import AdminLayout from "./Components/AdminLayout";
import Dashboard from "./Components/Dashboard";
import CreateCourse from "./Components/AdminDeshboard/CreateCourse/CreateCourse";
import AllCourses from "./Components/AdminDeshboard/LiveCourses/AllCourses";
import Users from "./Components/AdminDeshboard/AllUsers/Users";
import ManageTeam from "./Components/AdminDeshboard/ManageTeam/ManageTeam";
import Hero from "./Components/AdminDeshboard/HeroSection/Hero";
import FaqSection from "./Components/AdminDeshboard/FaqSection/FaqSection";
import Categories from "./Components/AdminDeshboard/Categories/Categories";
import CoursesAnalytices from "./Components/AdminDeshboard/CoursesAnalytics/CoursesAnalytices";
import UsersAnalytics from "./Components/AdminDeshboard/UsersAnalytics/UsersAnalytics";
import OrdersAnalytics from "./Components/AdminDeshboard/OrderAnalytics/OrderAnalytics";
import Overview from "./Components/AdminDeshboard/Overview/Overview";
import Invoices from "./Components/AdminDeshboard/Invoices/Invoices";
import CourseDetails from "./Pages/CourseDetails";
import PaymentCheckout from "./Pages/PaymentCheckout";
import UserProtected from "./Components/UserProtected";
import MyCourses from "./Pages/MyCourses";
import CourseContent from "./Pages/CourseContent";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />} />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
        <Route path="/course/:id" element={<CourseDetails />} />
         <Route path="" element={<UserProtected/>}>
          <Route path="/PaymentCheckout" element={<PaymentCheckout />} />
         </Route>
        <Route path="/profile" element={<Profile />}>
        
          <Route path="info" index element={<ProfileInfo />} />
          <Route path="security" element={<UserSecurity />} />
          
          <Route path="notification" element={<h2>this is info</h2>} />
          <Route path="closeaccount" element={<h2>this is info</h2>} />
        </Route>
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/cart" element={<CartPage/>}/>
       
      </Route>
      <Route element={<UserProtected/>}>
 <Route path="/my-courses/:id" element={<CourseContent/>}/>
      </Route>
      {/* adminroutes */}
      <Route element={<AdminProtected />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="allcourses" element={<AllCourses />} />
          <Route path="dashboard" element={<Overview />} />
          <Route path="createCourse" element={<CreateCourse />} />
          <Route path="faqSection" element={<FaqSection />} />
          <Route path="Manageteam" element={<ManageTeam />} />
          <Route path="categoriesSection" element={<Categories />} />
          <Route path="coursesAnalytics" element={<CoursesAnalytices />} />
          <Route path="usersAnalytics" element={<UsersAnalytics />} />
          <Route path="ordersAnalytics" element={<OrdersAnalytics />} />
          <Route path="Users" element={<Users />} />
          <Route path="dashboard" element={<CreateCourse />} />
          <Route path="Invoices" element={<Invoices />} />
          <Route path="heroSection" element={<Hero />} />
        </Route>
      </Route>
      {/* errorpage */}
      <Route path="*" element={<h2>this is a errorpage</h2>}/>
    </Routes>
  );
}

export default App;
