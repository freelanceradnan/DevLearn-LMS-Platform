import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronRight,
  CreditCard,
  Heart,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShoppingBag,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import AuthModel from "./AuthModel";

// Updated menu items with distinct icons and IDs
const displayMenuItems = [
  { id: "courses", name: "My Courses", link: "/courses", icon: BookOpen },
  { id: "cart", name: "My Cart", link: "/cart", icon: ShoppingBag },
  { id: "wishlist", name: "My Wishlist", link: "/wishlist", icon: Heart },
];

const Navbar = () => {
  const navigate = useNavigate();
  const user = {
    name: "Adnan",
    email: "reactorbro7222@gmail.com",
  };
  const [profileOn, setProfileOn] = useState(false);
  const [modal, setModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [openMenu, setOpenMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setModal(true);
    setOpenMenu(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const mobileMenuItems = [
    { id: "courses", name: "Courses", link: "/courses", icon: BookOpen },
    { id: "invite", name: "Invite Friends", link: "/invite", icon: UserPlus },
    { id: "help", name: "Help & Support", link: "/help", icon: HelpCircle },
  ];
  const displayMenuItems = [
    { id: "1", name: "My Courses", link: "/", icons: "" },
    { id: "1", name: "My Cart", link: "/", icons: "" },
    { id: "1", name: "My WishList", link: "/", icons: "" },
  ];
  return (
    <>
      {/* Primary Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenMenu(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={assets?.main_logo}
                alt="DevLearn Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md mx-2 hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn?"
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-200"
              />
            </form>
          </div>

          {/* Right Desktop Nav Links & User Actions */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-purple-700 transition-colors">
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:text-purple-700 transition-colors"
            >
              Courses
            </Link>
            <Link to="/faq" className="hover:text-purple-700 transition-colors">
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3 relative">
            {user ? (
              <button
                onClick={() => setProfileOn(!profileOn)}
                className="flex items-center gap-2 p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                title="Account Settings"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center text-sm">
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User size={18} />
                  )}
                </div>
              </button>
            ) : (
              <>
                <button
                  className="text-sm font-medium text-gray-700 hover:text-purple-700 px-3 py-2 rounded-lg transition-colors"
                  onClick={() => handleOpenAuth("login")}
                >
                  Log in
                </button>
                <button
                  className="text-sm font-semibold bg-purple-900 text-white px-4 py-2 rounded-full hover:bg-purple-950 shadow-sm transition-all duration-200"
                  onClick={() => handleOpenAuth("signup")}
                >
                  Join for Free
                </button>
              </>
            )}
            {profileOn && (
              <div className="absolute right-0 top-16 z-50 w-64 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm shadow-slate-200/50 transition-all">
                {/* Header Section */}
                <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-100 font-semibold text-purple-700 shadow-xs">
                    {user?.name ? (
                      <span className="text-lg font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User size={20} className="text-purple-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user?.name || "Guest User"}
                    </p>
                    <p className="truncate text-xs font-normal text-slate-400">
                      {user?.email || "Welcome back"}
                    </p>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="p-1.5">
                  {displayMenuItems.map((item) => {
                    // const Icon = item?.icon;
                    return (
                      <a
                        key={item?.id}
                        href={item?.link}
                        className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-purple-600"
                      >
                        <div className="flex items-center gap-3">
                          {/* <Icon
                            size={18}
                            className="text-slate-400 transition-colors group-hover:text-purple-600"
                          /> */}
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal Handler */}
      {modal && <AuthModel setModal={setModal} state={authMode} />}

      {/* Mobile Drawer Backdrop */}
      {openMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => {
            setOpenMenu(false);
            setProfileMenuOpen(false);
          }}
        >
          {/* Main Mobile Navigation Sidebar */}
          <div
            className="bg-white w-[80%] max-w-xs h-full fixed top-0 left-0 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <img
                  src={assets?.main_logo}
                  alt="DevLearn Logo"
                  className="h-9"
                />
                <button
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => {
                    setOpenMenu(false);
                    setProfileMenuOpen(false);
                  }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 sm:hidden border-b border-gray-100">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </form>
              </div>

              {/* User Identity / Auth Options */}
              <div className="p-4 border-b border-gray-100">
                {user ? (
                  <button
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 transition-colors text-left"
                    onClick={() => setProfileMenuOpen(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-purple-100 text-purple-700 font-semibold rounded-full flex items-center justify-center border border-purple-200">
                        {user.name ? (
                          user.name.charAt(0).toUpperCase()
                        ) : (
                          <User size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Hi, {user.name}
                        </p>
                        <p className="text-xs text-gray-500">Welcome back</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleOpenAuth("signup")}
                      className="w-full py-2 px-4 bg-purple-900 hover:bg-purple-950 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors text-center"
                    >
                      Sign up
                    </button>
                    <button
                      onClick={() => handleOpenAuth("login")}
                      className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition-colors text-center"
                    >
                      Log in
                    </button>
                  </div>
                )}
              </div>

              {/* Primary Mobile Menu Items */}
              <div className="p-2 space-y-1">
                {mobileMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 text-sm font-medium transition-colors"
                      onClick={() => {
                        setOpenMenu(false);
                        navigate(item.link);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-gray-500" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer / Copyright */}
            <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
              © 2026 DevLearn Inc. All rights reserved.
            </div>
          </div>

          {/* Sub-Drawer: Profile Settings */}
          {profileMenuOpen && (
            <div
              className="bg-white w-[80%] max-w-xs h-full fixed top-0 left-0 z-10 shadow-2xl flex flex-col overflow-y-auto transition-transform"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Back Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <button
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-purple-700 transition-colors"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                  onClick={() => {
                    setOpenMenu(false);
                    setProfileMenuOpen(false);
                  }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Account Navigation */}
              <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Your Account
                </h2>

                {/*Alerts */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Alerts
                  </p>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <Bell size={16} /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <MessageSquare size={16} /> Messages
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <Heart size={16} /> Wishlist
                    </button>
                  </div>
                </div>

                {/* Section 2: Account */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Account
                  </p>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <Settings size={16} /> Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <CreditCard size={16} /> Purchase History
                    </button>
                  </div>
                </div>

                {/* Section 3: Profile */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Profile
                  </p>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <User size={16} /> Public Profile
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
