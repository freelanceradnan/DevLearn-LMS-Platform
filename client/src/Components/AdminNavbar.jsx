import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  ChevronRight,
  CirclePlus,
  LogOut,
  Maximize,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  SquareArrowOutUpRight,
  Sun,
  User,
} from 'lucide-react';
import { useSelector } from 'react-redux';


// Closes a dropdown on outside click or Escape
const useDismiss = (open, onClose) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  return ref;
};

const IconButton = ({ label, children, className = '', ...props }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

const titleCase = (s) =>
  s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const NOTIFICATIONS = [
  { id: 1, title: 'New student enrolled', time: '2 min ago', unread: true },
  { id: 2, title: 'Course "React Basics" was updated', time: '1 hour ago', unread: true },
  { id: 3, title: 'Weekly report is ready', time: 'Yesterday', unread: false },
];

//open main side
const handleOpenMainSite = () => {
  
    window.open('/', '_blank', 'noopener,noreferrer');
  };

const AdminNavbar = ({
  setShowMobileMenu,
  showMobileMenu,
  showDesktop,
  setShowDesktop,
}) => {
  const {admin}=useSelector((state)=>state.admin)
  
  // const user = { name: 'Adnan', role: 'Admin', email: 'adnan@example.com' };
  const initials = admin.name.slice(0, 2).toUpperCase();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  const searchRef = useRef(null);

  const profileRef = useDismiss(profileOpen, () => setProfileOpen(false));
  const notifRef = useDismiss(notifOpen, () => setNotifOpen(false));

  const { pathname } = useLocation();
  const crumbs = pathname.split('/').filter(Boolean);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  // Ctrl/Cmd + K focuses search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      
    }
  };
const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
   
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  const handleMobileMenuToggle = () => {
    setProfileOpen(false);
    setNotifOpen(false);
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="sticky top-0 z-0 flex h-16 w-full items-center gap-2 border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:px-6">
      {/* Mobile menu */}
      <IconButton
        label="Toggle mobile menu"
        onClick={handleMobileMenuToggle}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </IconButton>

      {/* Desktop sidebar toggle */}
      {setShowDesktop && (
        <IconButton
          label={showDesktop ? 'Collapse sidebar' : 'Expand sidebar'}
          onClick={() => setShowDesktop(!showDesktop)}
          className="hidden md:inline-flex"
        >
          {showDesktop ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </IconButton>
      )}

      {/* Breadcrumb */}
     <nav aria-label="Breadcrumb" className="min-w-0 items-center text-sm flex">
  {crumbs.length === 0 ? (
    <span className="font-medium text-slate-900 dark:text-white" aria-current="page">
      Overview
    </span>
  ) : (
    crumbs.map((seg, i) => {
      const isLast = i === crumbs.length - 1;
      const to = '/' + crumbs.slice(0, i + 1).join('/');
      return (
        <React.Fragment key={to}>
          {i > 0 && (
            <ChevronRight className="hidden mx-1.5 h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600 md:block" />
          )}
          {isLast ? (
            <span className="truncate font-medium text-slate-900 dark:text-white" aria-current="page">
              {titleCase(seg)}
            </span>
          ) : (
            <Link
              to={to}
              className="hidden truncate text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white md:block"
            >
              {titleCase(seg)}
            </Link>
          )}
        </React.Fragment>
      );
    })
  )}
</nav>

      {/* Search */}
      <div className="relative mx-auto hidden w-full max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={searchRef}
          type="search"
          placeholder="Search students, courses..."
          className="h-9 w-full rounded-lg border border-transparent bg-slate-100 pl-9 pr-14 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400">
          Ctrl K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-0 md:ml-0">
        <div className='relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white '>
          <CirclePlus className="h-[18px] w-[18px]"/>
        </div>

        <button className='relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white' onClick={handleOpenMainSite}>
      
          <SquareArrowOutUpRight className="h-[18px] w-[18px]" />
        </button>

       <button className='relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white '  onClick={toggleFullscreen}>
        <Maximize className="h-[18px] w-[18px]"/>
       </button>
         {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <IconButton
            label="Notifications"
            aria-expanded={notifOpen}
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            )}
          </IconButton>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h2>
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-72 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
                {NOTIFICATIONS.map((n) => (
                  <li
                    key={n.id}
                    className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        n.unread ? 'bg-blue-500' : 'bg-transparent'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm text-slate-800 dark:text-slate-100">{n.title}</p>
                      <p className="text-xs text-slate-400">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Theme */}
        <IconButton
          label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
        >
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </IconButton>

       

        <span className="mx-2 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            aria-label="Open user menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-slate-800"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
              {initials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-4 text-slate-900 dark:text-white">
                {admin.name}
              </span>
              <span className="block text-xs text-slate-400">{admin.role}</span>
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-400">{admin.email}</p>
              </div>

              <div className="p-1.5 text-sm text-slate-700 dark:text-slate-200">
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User size={16} /> My profile
                </button>
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Settings size={16} /> Settings
                </button>
              </div>

              <div className="border-t border-slate-100 p-1.5 dark:border-slate-800">
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <LogOut size={16} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;