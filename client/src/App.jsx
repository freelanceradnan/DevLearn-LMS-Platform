import { useState } from "react";
import Rootlayout from "./Pages/Rootlayout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import GitHubCallback from "./Pages/GithubCallback";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Rootlayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/auth/github/callback" element={<GitHubCallback/>}/>
      <Route path="/profile" element={<Profile/>}>
      <Route path="info" element={<h2>THISIS </h2>}/>
      </Route>
      </Route>
    </Routes>
  )
}

export default App;
