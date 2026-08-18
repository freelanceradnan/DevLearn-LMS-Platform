import React from 'react';
import { LogOut } from 'lucide-react';
import { assets } from '../assets/assets';

export default function Sidebar({ showMobileMenu, setShowMobileMenu, menuGroups = [] }) {
 
  const RenderNavContent = () => (
    <>
      {/* Header */}
      <header className="flex h-16 items-center border border-[#E0E0E2] bg-[#F4F4F6] px-6 tracking-wider text-[#18181A]">
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
          [&::-webkit-scrollbar-thumb]:rounded-full bg-[#F4F4F6]"
      >
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <p className="px-3 text-[11px] font-semibold text-[#6f6f7a] uppercase tracking-widest mb-2">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <li key={itemIdx}>
                    <a
                      href="#"
                      className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#E7E7E9] transition-colors"
                    >
                      <Icon size={18} className="text-[#2d2d35] group-hover:text-black" />
                      <span className="text-[#6f6f7a]  group-hover:text-black text-xs font-medium">
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 bg-[#FFFFFF] rounded-sm">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
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