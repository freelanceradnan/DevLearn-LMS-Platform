import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserSingleCourseQuery } from "../Features/ApiSlice";
import {
  Play,
  CheckCircle,
  ChevronDown,
  FileText,
  Star,
  Clock,
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
  GraduationCap,
} from "lucide-react";
import { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import AuthModal from "../Components/AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { ApiSlice, useLogoutUserMutation } from "../Features/ApiSlice";
import toast from "react-hot-toast";
import { setUser, logoutUser } from "../Features/AuthSlice";
import ProfileMenu from "../Components/ProfileMenu";
import UserMenu from "../Components/UserMenu";
import CoursePlayer from "../Components/AdminDeshboard/CreateCourse/CoursePlayer";

// every users visible otpions
const guestMenu = [
  { name: "My Cart", to: "/cart", icons: <ShoppingCart size={16} /> },
  { name: "My WishList", to: "/withlist", icons: <Heart size={16} /> },
  { name: "Help and Support", to: "/support", icons: <Headset size={16} /> },
];
//courseFeatures
const courseFeatures = [
  { btn: "Overview", icon: BookOpen },
  { btn: "Resources", icon: FileText },
  { btn: "QNA", icon: MessageSquare },
];
const CourseContent = () => {
  const [courseData, setCourseData] = useState([]);
  const [isActiveVideo, setIsActiveVideo] = useState(null);
  const [activeFeature, setActiveFeature] = useState("Overview");
  const [activeUrl, setActiveUrl] = useState("");
  const [activeVideoTitle, setActiveVideoTitle] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [logoutcall] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [profileOn, setProfileOn] = useState(false);
  const [modal, setModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [openMenu, setOpenMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams();
  const { data } = useGetUserSingleCourseQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (data) {
      setCourseData([data]);
      // Set default video if available
      if (data.courseData && data.courseData.length > 0) {
        setActiveUrl(data.courseData[0].videoUrl);
        setActiveVideoTitle(data.courseData[0].title);
        setIsActiveVideo(data.courseData[0].videoSection); // Open the first section by default
      }
    }
  }, [data]);
  //automatic desable menu
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
  const groupMap = {};
  courseData[0]?.courseData?.forEach((item) => {
    const videoSection = item.videoSection;
    if (!groupMap[videoSection]) {
      groupMap[videoSection] = {
        SectionTitle: videoSection,
        SectionContent: [],
      };
    }
    groupMap[videoSection].SectionContent.push(item);
  });

  const formattedCourseSections = Object.values(groupMap);

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
  //checking isadmin login
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);
  //logout
  const logout = async () => {
    try {
      const result = await logoutcall().unwrap();
      toast.success("logout success!");
    } catch (error) {
      toast.error("logout failed!");
    } finally {
      dispatch(logoutUser());
      setProfileOn(false);
      dispatch(ApiSlice.util.resetApiState());
    }
  };

  return (
    <div>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-13 gap-4">
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
            {/* Center: Course Name */}
            <div className="flex-1 max-w-md mx-2 hidden sm:block truncate">
              <h2 className="font-bold text-slate-800 text-lg truncate">
                | {courseData[0]?.name || "Loading Course..."}
              </h2>
            </div>
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
                  onClick={() => {
                    navigate("/profile/info");
                    setProfileOn(false);
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
                  {user ? (
                    <>
                      <UserMenu logout={logout} />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2.5 items-start">
                        {guestMenu.map((items, index) => (
                          <Link
                            key={index}
                            className="hover:bg-[#f0f6ff] w-full py-1 text-sm px-1 flex gap-2 items-center text-[#676a83]"
                          >
                            <span> {items.icons}</span>
                            {items.name}
                          </Link>
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
      <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
        {/* Main Layout Container */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Left Side: Video Player*/}
          <div className="w-full lg:w-[65%] flex flex-col gap-4">
            {/* Video Player Wrapper */}
            <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <CoursePlayer videoUrl={activeUrl} />
            </div>

            {/* Current Playing Title */}
            {activeVideoTitle && (
              <div className="flex items-center gap-2 px-1 text-slate-700 font-medium">
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="text-sm">
                  Now Playing:{" "}
                  <strong className="text-slate-900">{activeVideoTitle}</strong>
                </span>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex gap-8 border-b border-slate-200 mt-2">
              {courseFeatures.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeFeature === item.btn;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(item.btn)}
                    className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-all relative ${
                      isActive
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.btn}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              {activeFeature === "Overview" && (
                <>
                  {courseData.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <h1 className="text-2xl font-bold text-slate-900">
                        {item.name}
                      </h1>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>4.6 Star</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>1.5 hours</span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">
                          Last Updated 2026
                        </span>
                      </div>

                      <hr className="border-slate-100 my-4" />

                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          About this course
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Instructor
                        </h3>
                        <p className="text-slate-800 font-medium flex gap-1">
                          <GraduationCap size={20} />{item.owner}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeFeature === "Resources" && (
                <div className="text-center py-10 text-slate-500">
                  <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p>
                    No downloadable resources available for this course yet.
                  </p>
                </div>
              )}

              {activeFeature === "QNA" && (
                <div className="text-center py-10 text-slate-500">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p>
                    Have questions? The Q&A discussion board will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side*/}
          <div className="w-full lg:w-[35%] bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col h-fit overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">
                Course Content
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {formattedCourseSections.length} sections available
              </p>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {formattedCourseSections.map((section, sIndex) => {
                const isActiveSection = section.SectionTitle === isActiveVideo;
                return (
                  <div key={sIndex} className="group">
                    <button
                      onClick={() => {
                        const newActive = isActiveSection
                          ? null
                          : section.SectionTitle;
                        setIsActiveVideo(newActive);

                        if (
                          !isActiveSection &&
                          section.SectionContent?.length > 0
                        ) {
                          setActiveUrl(section.SectionContent[0].videoUrl);
                          setActiveVideoTitle(section.SectionContent[0].title);
                        }
                      }}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors"
                    >
                      <span className="text-sm pr-2">
                        {section.SectionTitle}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isActiveSection ? "rotate-180 text-indigo-600" : ""}`}
                      />
                    </button>

                    {/* Videos List */}
                    {isActiveSection && (
                      <div className="flex flex-col bg-slate-50/50 pb-2">
                        {section.SectionContent.map((video, vIndex) => {
                          const isCurrentVideoPlaying =
                            activeUrl === video.videoUrl;
                          return (
                            <button
                              key={vIndex}
                              onClick={() => {
                                setActiveUrl(video.videoUrl);
                                setActiveVideoTitle(video.title);
                              }}
                              className={`flex items-center gap-3 px-6 py-3 text-left text-sm transition-all ${
                                isCurrentVideoPlaying
                                  ? "bg-indigo-50/80 text-indigo-700 font-medium border-l-4 border-indigo-600"
                                  : "text-slate-600 hover:bg-slate-100/60 hover:text-slate-900"
                              }`}
                            >
                              <Play
                                className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrentVideoPlaying ? "text-indigo-600 fill-indigo-600" : "text-slate-400"}`}
                              />
                              <span className="truncate">{video.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
                    onClick={() => {
                      navigate("/profile");
                      setOpenMenu(false);
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
                {user ? (
                  <>
                    <UserMenu logout={logout} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-2.5 items-start">
                      {guestMenu.map((items, index) => (
                        <Link
                          key={index}
                          className="hover:bg-[#f0f6ff] w-full py-1 text-sm px-1 flex gap-2 items-center text-[#676a83]"
                        >
                          <span> {items.icons}</span>
                          {items.name}
                        </Link>
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
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between"></div>

              {/* Account Navigation */}
              <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                <Navigate to="/profile" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseContent;
