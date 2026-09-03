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


function App() {
  return (
    <Routes>
      <Route path="/" element={<Rootlayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/auth/github/callback" element={<GitHubCallback/>}/>
      <Route path="/profile" element={<Profile/>}>
      <Route path="info" index element={<ProfileInfo/>}/>
      <Route path="security" element={<UserSecurity/>}/>
      <Route path="notification" element={<h2>this is info</h2>}/>
      <Route path="closeaccount" element={<h2>this is info</h2>}/>
  
      </Route>
      </Route>
      {/* adminroutes */}
      <Route element={<AdminProtected/>}>
      <Route path="/admin" element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}/>
       <Route path="allcourses" element={<AllCourses/>}/>
      <Route path="createCourse" element={<CreateCourse/>}/>
      <Route path="Manageteam" element={<ManageTeam/>}/>
      <Route path="Users" element={<Users/>}/>
      <Route path="dashboard" element={<CreateCourse/>}/>
      </Route>
      </Route>
    </Routes>
  )
}

export default App;
