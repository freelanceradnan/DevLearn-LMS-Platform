import { useState } from "react";
import Rootlayout from "./Pages/Rootlayout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import GitHubCallback from "./Pages/GithubCallback";
import Profile from "./Pages/Profile";
import ProfileInfo from "./Components/ProfileInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Rootlayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/auth/github/callback" element={<GitHubCallback/>}/>
      <Route path="/profile" element={<Profile/>}>
      <Route path="info" index element={<ProfileInfo/>}/>
      <Route path="security" element={<h2>this is info</h2>}/>
      <Route path="notification" element={<h2>this is info</h2>}/>
      <Route path="closeaccount" element={<h2>this is info</h2>}/>
  
      </Route>
      </Route>
    </Routes>
  )
}

export default App;
