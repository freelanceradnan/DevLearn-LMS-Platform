import { ArrowLeftFromLine, Bell, Menu, Search, SquareChevronLeft, User } from 'lucide-react';
import React from 'react';

const AdminNav = ({ setShowMobileMenu, showMobileMenu,showDesktop,setShowDeshtop})=>{
    return (
        <header className="h-16 bg-[#FFFFFF] border-b border-[#EFEFEF] sticky top-0 z-10 flex items-center px-6">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu className="md:hidden" />
            </button>
        <div className='flex w-full justify-between'>
 {/* Search Input Container */}
        <div className="relative flex-1 max-w-md ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hidden md:block" />
          <input
            type="search"
            placeholder="Search for anything ..."
            className="w-3/4 pl-9 pr-4 py-1.5 text-sm bg-[#FFFFFF] border border-[#e0dbdb] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all hidden md:block"
          />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            aria-label="Notifications"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative border-[#e0dbdb] border"
          >
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
          </button>
          
          <button 
            type="button" 
            aria-label="User profile"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border-[#e0dbdb] border"
          >
            <User className="h-4 w-4 text-gray-600"/>
          </button>
        </div>
        </div>
          </header>
    );
};

export default AdminNav;