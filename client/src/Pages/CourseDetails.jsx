import {
  Check,
  ChevronRight,
  FileDown,
  SquarePlay,
  Star,
  Trophy,
  Infinity,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {

  useGetPubCourseDetailsQuery,
  useGetUserInfoQuery,
} from "../Features/ApiSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "../Components/CheckoutFrom";
import CoursePlayer from "../Components/AdminDeshboard/CreateCourse/CoursePlayer";



const CourseDetails = () => {
  const navigate = useNavigate();
 const {data:UsersCoursesId}=useGetUserInfoQuery()

  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [GroupOpen, setGroupOpen] = useState("");
  const [isEnrolled,setIsEnrolled]=useState(false)
  const { data, isLoading } = useGetPubCourseDetailsQuery(id, {
    skip: !id,
  });

  useEffect(() => {
   
    const userCourses = UsersCoursesId || []
    
    if (userCourses && Array.isArray(userCourses)) {
      const enrolled = userCourses.some((item) => (item._id ? item._id == id : item == id));
      setIsEnrolled(enrolled);
    }
  }, [UsersCoursesId, id]);

  useEffect(() => {
    if (data) {
      setCourseDetails(data);
    }
  }, [data]);
  
  const groupedMap = {};
  data?.courseData?.forEach((item) => {
    const sectionName = item.videoSection?.trim();
    const titleName = item.title?.trim();
    if (!sectionName) return;
    if (!groupedMap[sectionName]) {
      groupedMap[sectionName] = { section: sectionName, data: [] };
    }
    if (!groupedMap[sectionName].data.includes(titleName)) {
      groupedMap[sectionName].data.push(titleName);
    }
  });
  const groupedSection = Object.values(groupedMap);

  const discountPercentagePrice = courseDetails?.estimatedPrice
    ? Math.round(
        ((courseDetails.estimatedPrice - courseDetails.price) /
          courseDetails.estimatedPrice) *
          100,
      )
    : 0;

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-medium text-slate-600">
        Loading course details...
      </div>
    );
  }
const NavigatePayment=()=>{
 navigate('/paymentcheckout', { state: courseDetails });
}
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-slate-900 text-slate-300 py-6 px-6 md:px-16 mb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <span>Course</span>
          <ChevronRight size={16} />
          <span>Web Development</span>
          <ChevronRight size={16} />
          <span className="text-white font-medium truncate">
            {courseDetails?.name}
          </span>
        </div>
        <div className="max-w-7xl mx-auto mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {courseDetails?.name}
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl line-clamp-2">
            {courseDetails?.description}
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-300">
            <span className="bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded font-semibold flex items-center gap-1">
              <Star size={14} fill="currentColor" /> 4.8
            </span>
            <span>
              Created by{" "}
              <strong className="text-white">{courseDetails?.owner}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Details (Left Side) */}
        <div className="lg:col-span-2 space-y-6 flex-1 order-last md:order-first">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              What you'll learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {courseDetails?.benefits?.map((item) => (
                <div key={item._id} className="flex items-start gap-2.5">
                  <Check className="text-emerald-600 mt-1 shrink-0" size={18} />
                  <p className="text-sm text-slate-700">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contents */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Course Contents
            </h3>
            <div className="space-y-3">
              {groupedSection?.map((group, index) => {
                const isOpen = GroupOpen === group.section;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() =>
                        setGroupOpen(isOpen ? null : group.section)
                      }
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    >
                      <span className="font-semibold text-slate-700 flex items-center gap-2">
                        {group.section}
                      </span>
                      <div className="text-slate-500 flex gap-1 text-sm">
                        <span>{group?.data?.length} Lectures</span>
                        {isOpen ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="bg-white px-4 py-3 border-t border-slate-200 space-y-2.5">
                        {group.data?.map((title, titleIndex) => (
                          <div
                            key={titleIndex}
                            className="flex items-center gap-3 text-slate-600 hover:text-blue-600 text-sm py-1.5 transition-colors cursor-pointer"
                          >
                            <SquarePlay
                              size={18}
                              className="text-slate-400 shrink-0"
                            />
                            <span>{title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview Card & Checkout (Right Side) */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden sticky top-6">
            <div className="relative aspect-video bg-black flex items-center justify-center text-white">
              {/* <p className="text-sm">Course Preview / Video</p> */}
              <CoursePlayer videoUrl={courseDetails?.demoUrl}/>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  {courseDetails?.price === 0
                    ? "Free"
                    : `$${courseDetails?.price}`}
                </span>
                {courseDetails?.estimatedPrice > 0 && (
                  <span className="text-base text-slate-400 line-through font-medium">
                    ${courseDetails?.estimatedPrice}
                  </span>
                )}
                {discountPercentagePrice > 0 && (
                  <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    {discountPercentagePrice}% OFF
                  </span>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2.5">
                  <Infinity size={18} className="text-slate-400" /> Full
                  lifetime access
                </p>
                <p className="flex items-center gap-2.5">
                  <Trophy size={18} className="text-slate-400" /> Certificate of
                  completion
                </p>
              </div>

             {!isEnrolled?
             <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md disabled:opacity-50 cursor-pointer"
                onClick={()=>NavigatePayment()}
              >
                Pay & Enroll
              </button>:
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md disabled:opacity-50 cursor-pointer" onClick={()=>navigate(`/my-courses/${id}`)}>
              View Course
              </button> 
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
