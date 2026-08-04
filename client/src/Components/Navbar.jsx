import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Search } from 'lucide-react';
import AuthModel from './AuthModel';

const Navbar = () => {
   const [modal,setModal]=useState(false)
   const [state,setState]=useState(null)
   const clickSignupBtn=()=>{
    setModal(true)
    setState('signup')
   }
   const clickloginBtn=()=>{
    setModal(true)
    setState('login')
   }
    return (
       <nav className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#e7e0d1] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center">
          <img 
            src={assets?.main_logo} 
            alt="DevLearn Logo" 
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-purple-700 transition-colors">
            Home
          </Link>
          <Link to="/courses" className="hover:text-purple-700 transition-colors">
            Courses
          </Link>
          <Link to="/faq" className="hover:text-purple-700 transition-colors">
            FAQ
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-700 hover:text-purple-700 px-3 py-2 rounded-lg transition-colors" onClick={clickloginBtn}>
            Log in
          </button>
          <button className="text-sm font-medium bg-[#5b1950] text-white px-4 py-2 rounded-full hover:bg-[#43123b] shadow-sm transition-all duration-200" onClick={clickSignupBtn}>
            Join for Free
          </button>
        </div>

      </div>
       {modal && <AuthModel setModal={setModal} state={state}/>}
    </nav>
    );
};

export default Navbar;