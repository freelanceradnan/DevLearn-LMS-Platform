import React from 'react';
import { LogOut } from 'lucide-react';
import { assets } from '../assets/assets';
import { useLogoutUserMutation } from '../Features/ApiSlice';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Features/AuthSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Sidebar({ showMobileMenu, setShowMobileMenu, menuGroups = [] }) {
  const [logout] = useLogoutUserMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutuser = async () => {
    try {
      const result = await logout().unwrap();
      if (result) {
        await dispatch(logoutUser());
      }
      toast.success('logout done');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const RenderNavContent = () => (
    <>
      {/* Header */}
      <header className="flex h-16 items-center border-b border-[#E0E0E2] bg-[#FFFFFF] px-6 tracking-wider text-[#18181A]">
        <div>
          <div className="flex items-center gap-1.5">
            <img src={assets.adminLogo} alt="DevLearn Logo" className="w-8" />
            <div>
              <span className="font-semibold uppercase text-sm">DevLearn</span>
              <h2 className="text-xs font-light text-gray-500">Control everything here</h2>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation List */}
      <nav 
        className="flex-1 overflow-y-auto px-4 py-4 space-y-6 
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-transparent
          hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full bg-[#FFFFFF]"
      >
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <p className="px-3 text-[11px] font-semibold text-[#6f6f7a] uppercase tracking-widest mb-2">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const cleanLink = item.link.startsWith('/') ? item.link.slice(1) : item.link;
                const fullPath = `/admin/${cleanLink}`;
                const isActive = location.pathname.toLowerCase() === fullPath.toLowerCase();

                return (
                  <li key={itemIdx}>
                    <Link
                      to={fullPath}
                      onClick={() => setShowMobileMenu?.(false)}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#E7E7E9] transition-colors ${
                        isActive ? "bg-[#EEFAE8]" : ""
                      }`}
                    >
                      <Icon 
                        size={18} 
                        className={`text-[#2d2d35] group-hover:text-black ${
                          isActive ? "text-[#57af85]" : ""
                        }`} 
                      />
                      <span 
                        className={`text-[#6f6f7a] group-hover:text-black text-xs font-semibold ${
                          isActive ? "text-[#14d377]" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 bg-[#FFFFFF] rounded-sm border-t border-[#E0E0E2]">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors" 
          onClick={logoutuser}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="w-64 h-screen bg-white hidden md:flex flex-col fixed top-0 left-0 border-r border-[#CBD0DD] z-20">
        <RenderNavContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 w-full h-screen backdrop-blur-md bg-black/40 z-50 md:hidden"
          onClick={() => setShowMobileMenu?.(false)}
        >
          <div 
            className="w-64 h-screen bg-white flex flex-col fixed top-0 left-0 border-r border-[#CBD0DD] z-50 shadow-xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <RenderNavContent />
          </div>
        </div>
      )}
    </>
  );
}