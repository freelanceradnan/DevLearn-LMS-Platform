import React, { useEffect, useState } from "react";
import { useGetUsersCoursesQuery } from "../Features/ApiSlice";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const {
    data: allcourses,
    isLoading,
    isFetching,
    refetch
  } = useGetUsersCoursesQuery();

  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    if (allcourses) {
      setCoursesData(allcourses.data);
    }
  }, [allcourses]);
useEffect(() => {
  const timer = setTimeout(() => {
    refetch();
  }, 5000);

  return () => clearTimeout(timer);
}, [refetch]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading your courses...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Enrolled Courses</h2>
        
        {isFetching && <span className="text-xs text-indigo-500 animate-pulse">Syncing...</span>}
      </div>

      {coursesData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 w-full bg-gray-200">
                <img 
                  src={item.thumbnail.url || "https://via.placeholder.com/400x225"} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description || "Continue learning and master your skills with this course."}
                  </p>
                </div>

                {/* Action Button */}
                <Link 
                  to={`/my-courses/${item._id}`} 
                  className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mt-6">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No Courses Found!</h3>
          <p className="text-sm text-gray-500 mb-6">You haven't enrolled in any courses yet. Explore our catalog and start learning today.</p>
          <Link 
            to="/courses" 
            className="inline-block bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};



export default MyCourses;