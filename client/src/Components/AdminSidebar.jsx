import React, { useEffect, useState } from 'react';
import { LogOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'admin-sidebar-collapsed';

const NavContent = ({
  menuGroups,
  location,
  collapsed = false,
  onNavigate,
  onClose,
  setOpenLogoutModel,
}) => (
  <div className="flex h-full flex-col bg-white">
    {/* Brand */}
    <header
      className={`flex h-16 shrink-0 items-center border-b border-zinc-200 ${
        collapsed ? 'justify-center px-2' : 'justify-between px-5'
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={assets.adminLogo}
          alt="DevLearn logo"
          className="h-9 w-9 shrink-0 rounded-lg object-contain"
        />
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-tight text-zinc-900">DevLearn</p>
            <p className="text-xs text-zinc-500">Admin panel</p>
          </div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <X size={18} />
        </button>
      )}
    </header>

    {/* Navigation */}
    <nav
      aria-label="Admin navigation"
      className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 py-5
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300"
    >
      {menuGroups.map((group, groupIdx) => (
        <div key={groupIdx}>
          {collapsed ? (
            groupIdx > 0 && <div aria-hidden="true" className="mx-3 mb-3 border-t border-zinc-200" />
          ) : (
            <p className="mb-2 px-3 text-xs font-medium text-zinc-400">{group.group}</p>
          )}

          <ul className="space-y-0.5">
            {group.items.map((item, itemIdx) => {
              const Icon = item.icon;
              const cleanLink = item.link.startsWith('/') ? item.link.slice(1) : item.link;
              const fullPath = `/admin/${cleanLink}`;
              const isActive = location.pathname.toLowerCase() === fullPath.toLowerCase();

              return (
                <li key={itemIdx} className="relative">
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-emerald-500"
                    />
                  )}

                  <Link
                    to={fullPath}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      collapsed ? 'justify-center px-0' : 'px-3'
                    } ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    <Icon
                      size={collapsed ? 20 : 18}
                      strokeWidth={isActive ? 2.25 : 1.75}
                      className={`shrink-0 ${
                        isActive
                          ? 'text-emerald-600'
                          : 'text-zinc-400 transition-colors group-hover:text-zinc-700'
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>

    {/* Footer */}
    <div className="shrink-0 border-t border-zinc-200 p-3">
      <button
        type="button"
        onClick={() => setOpenLogoutModel(true)}
        title={collapsed ? 'Log out' : undefined}
        aria-label={collapsed ? 'Log out' : undefined}
        className={`flex w-full items-center gap-3 rounded-lg py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
          collapsed ? 'justify-center px-0' : 'px-3'
        }`}
      >
        <LogOut size={collapsed ? 20 : 18} strokeWidth={1.75} className="shrink-0" />
        {!collapsed && <span>Log out</span>}
      </button>
    </div>
  </div>
);

export default function Sidebar({
  showMobileMenu,
  setShowMobileMenu,
  menuGroups = [],
  OpenLogoutModel,
  setOpenLogoutModel,
  collapsed: collapsedProp,
  setCollapsed: setCollapsedProp,
}) {
  const location = useLocation();
  const closeMobile = () => setShowMobileMenu?.(false);

  // Works controlled (props) or on its own (internal state, remembered in localStorage)
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const isControlled = typeof collapsedProp === 'boolean';
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    if (isControlled) setCollapsedProp?.(next);
    else setInternalCollapsed(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* storage unavailable */
    }
  };

  // Close on Escape + lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!showMobileMenu) return;

    const onKeyDown = (e) => e.key === 'Escape' && setShowMobileMenu?.(false);
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu, setShowMobileMenu]);

  return (
    <>
      <style>{`
        @keyframes sidebar-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes sidebar-fade { from { opacity: 0; } to { opacity: 1; } }
        .sidebar-panel { animation: sidebar-in .22s ease-out; }
        .sidebar-backdrop { animation: sidebar-fade .22s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .sidebar-panel, .sidebar-backdrop { animation: none; }
          .sidebar-desktop { transition: none !important; }
        }
      `}</style>

      {/* Desktop sidebar */}
      <aside
        className={`sidebar-desktop fixed left-0 top-0 z-20 hidden h-screen border-r border-zinc-200 bg-white transition-[width] duration-200 ease-out md:block ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        <NavContent
          menuGroups={menuGroups}
          location={location}
          collapsed={collapsed}
          setOpenLogoutModel={setOpenLogoutModel}
        />

        {/* Collapse / expand toggle, sits on the sidebar edge */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3.5 top-[22px] z-30 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </aside>

      {/* Mobile drawer (always full width, never collapsed) */}
      {showMobileMenu && (
        <div
          className="sidebar-backdrop fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Admin menu"
            className="sidebar-panel fixed left-0 top-0 h-screen w-72 max-w-[85vw] border-r border-zinc-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NavContent
              menuGroups={menuGroups}
              location={location}
              onNavigate={closeMobile}
              onClose={closeMobile}
              setOpenLogoutModel={setOpenLogoutModel}
            />
          </aside>
        </div>
      )}
    </>
  );
}