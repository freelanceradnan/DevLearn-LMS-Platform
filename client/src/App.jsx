import { useState } from "react";
import Rootlayout from "./Pages/Rootlayout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Rootlayout/>}>
      <Route index element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default App;
