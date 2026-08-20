import React, { useState } from 'react';
import { 
  ArrowLeftFromLine, 
  Bell, 
  LogOut, 
  Menu, 
  Search, 
  Settings, 
  Sun, 
  User 
} from 'lucide-react';

const AdminNav = ({ 
  setShowMobileMenu, 
  showMobileMenu, 
  showDesktop, 
  setShowDesktop 
}) => {
  const user = { name: "Adnan" };
  const [showMenu, setShowMenu] = useState(false);

  // Toggle mobile menu and ensure user menu closes immediately
  const handleMobileMenuToggle = () => {
    setShowMenu(false);
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-[#EFEFEF] bg-white px-4 md:px-6">
      {/* Mobile Hamburger Toggle */}
      <button 
        type="button"
        onClick={handleMobileMenuToggle}
        className="relative z-50 mr-3 p-1 text-gray-600 hover:text-gray-900 md:hidden"
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Main Nav Row */}
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {setShowDesktop && (
            <button
              type="button"
              onClick={() => setShowDesktop(!showDesktop)}
              className="hidden p-1.5 text-gray-500 hover:text-gray-800 md:block"
              aria-label="Toggle desktop sidebar"
            >
              <ArrowLeftFromLine className={`h-5 w-5 transition-transform ${!showDesktop ? 'rotate-180' : ''}`} />
            </button>
          )}

          <div className="relative w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search for anything ..."
              className="w-full rounded-lg border border-[#e0dbdb] bg-white py-1.5 pl-9 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            aria-label="Toggle theme"
            className="rounded-md border border-[#e0dbdb] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Sun className="h-4 w-4" />
          </button>

          <button 
            type="button" 
            aria-label="Notifications"
            className="relative rounded-md border border-[#e0dbdb] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          
          <button 
            type="button" 
            aria-label="User profile"
            className="rounded-md border border-[#e0dbdb] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dropdown Backdrop Layer */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="absolute right-5 top-16 z-40 w-56 rounded-md border border-[#E0DBDB] bg-white/95 p-3 shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-medium text-white">
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <h2 className="truncate text-sm font-semibold text-gray-800">
                  {user?.name || 'Adnan dev'}
                </h2>
                <p className="truncate text-xs text-gray-400">Admin</p>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-1 text-sm text-gray-700">
              <button 
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <User size={16} /> My Profile
              </button>

              <button 
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Settings size={16} /> Settings
              </button>

              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-red-500 py-1.5 text-white hover:bg-red-600 transition-colors"
              >
                Logout <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminNav;