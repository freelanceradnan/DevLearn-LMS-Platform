import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronRight,
  CreditCard,
  Headset,
  Heart,
  HelpCircle,
  LogOut,
  LogOutIcon,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import AuthModel from "./AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { ApiSlice, useLogoutUserMutation } from "../Features/ApiSlice";
import toast from "react-hot-toast";
import { setUser,logoutUser} from "../Features/AuthSlice";
import ProfileMenu from "./ProfileMenu";
import UserMenu from "./UserMenu";

// every users visible otpions
const guestMenu=[
   { name: "My Cart", to: "/cart",icons:<ShoppingCart size={16}/>},
    { name: "My WishList", to: "/withlist",icons:<Heart size={16}/>},
     { name: "Help and Support", to: "/support",icons:<Headset size={16}/>},
]

const Navbar = () => {
  const navigate = useNavigate();
  const [logoutuser] = useLogoutUserMutation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [profileOn, setProfileOn] = useState(false);
  const [modal, setModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [openMenu, setOpenMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // automatic disabled menu for pc
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOn(false);
      }
    }
    if (profileOn) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOn]);

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

  const logout = async () => {
    try {
      const result = await logoutuser().unwrap();
      toast.success("logout success!");
    } catch (error) {
      toast.error("logout failed!");
    } finally {
      dispatch(logoutUser());
      setProfileOn(false)
      dispatch(ApiSlice.util.resetApiState());
      
    }
  };
  return (
    <>
      {/* Primary Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenMenu(!profileOn)}
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

          <div
            className="hidden md:flex items-center gap-3 relative"
            ref={dropdownRef}
          >
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
              <div className="absolute right-0 top-15 z-50 w-64 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm shadow-slate-200/50 transition-all">
                {/* Header Section */}
                <button
                  className="flex items-center gap-3 border-b border-slate-100 p-4"
                  onClick={() =>{
                     navigate("/profile/info")
                     setProfileOn(false)
                  }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-100 font-semibold text-purple-700 shadow-xs">
                    {user?.name ? (
                      <span className="text-lg font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User size={20} className="text-purple-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col items-start">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user?.name || "Guest User"}
                    </p>
                    <p className="truncate text-xs font-normal text-slate-400">
                      {user?.email || "Welcome back"}
                    </p>
                  </div>
                  <div>
                    <ChevronRight size={18} className="text-blue-300" />
                  </div>
                </button>

                {/* Menu Options */}
                <div className="py-2 px-6">
             {user?(
<>
 <UserMenu logout={logout}/>
</>
                ):(
<>

                   <div className="flex flex-col gap-2.5 items-start">
                       {guestMenu.map((items,index) => (
                         <Link key={index} className="hover:bg-[#f0f6ff] w-full py-1 text-sm px-1 flex gap-2 items-center text-[#676a83]">
                            <span> {items.icons}</span>
                             {items.name}</Link>
                       ))}
                       
                     </div>
</>
                )}
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
                    onClick={() =>{
                       navigate('/profile')
                       setOpenMenu(false)
                    }}
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
              <div className="p-3 space-y-1">
                {user?(
<>
 <UserMenu logout={logout}/>
</>
                ):(
<>

                   <div className="flex flex-col gap-2.5 items-start">
                       {guestMenu.map((items,index) => (
                         <Link key={index} className="hover:bg-[#f0f6ff] w-full py-1 text-sm px-1 flex gap-2 items-center text-[#676a83]">
                            <span> {items.icons}</span>
                             {items.name}</Link>
                       ))}
                       
                     </div>
</>
                )}
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
              
               
              </div>

              {/* Account Navigation */}
              <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              <Navigate to="/profile"/>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
