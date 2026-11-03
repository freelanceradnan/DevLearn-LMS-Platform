import React from 'react';
import { assets } from '../assets/assets';
import CourseCard from './CourseCart';
import { ArrowRight, RefreshCw, SearchX } from 'lucide-react';
import { useGetPubCoursesQuery } from '../Features/ApiSlice';
import { useNavigate } from 'react-router-dom';

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm animate-pulse">
      <div className="h-40 w-full rounded-xl bg-gray-200" />
      <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
      <div className="mt-4 h-8 w-full rounded-full bg-gray-200" />
    </div>
  );
}

const PopularCourses = () => {
  const { data, isLoading, isError, isFetching, refetch } = useGetPubCoursesQuery();
  const navigate = useNavigate();

 //derived courses
  const courses = Array.isArray(data) ? data : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 bg-[#FFFFFF]">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-[#09C82C] text-center text-[14px] uppercase font-bold">Course</h1>
        <h2 className="text-[31px] font-semibold text-[#171717]">
          Explore Our Popular <span className="text-[#09C82C]">Courses</span>
        </h2>
        <p className="text-[#7d7e83] max-w-[600px] text-center text-[16px]">
          Choose from hundreds of courses designed by industry experts to help you achieve your goals.
        </p>
      </div>

      <div className="py-10">
        {/* 1. Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* 2. Error */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-red-500 text-sm">
              Cannot Loading Course Data Please Try Again to Reload Connection!
            </p>
            <button
              onClick={refetch}
              disabled={isFetching}
              className="flex items-center gap-2 rounded-full bg-[#09C82C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#08AA25] disabled:opacity-60 transition-colors"
            >
              <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
              Retry
            </button>
          </div>
        )}

        {/* 3. Empty */}
        {!isLoading && !isError && courses.length === 0 && (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
            <SearchX size={18} />
            <p className="text-sm">No Courses Available!</p>
          </div>
        )}

        {/* 4. Success */}
        {!isLoading && !isError && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {courses.map((cart, index) => (
              <CourseCard key={cart._id} cart={cart} assets={assets} index={index} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          className="border rounded-full flex py-1 px-3 text-[15px] items-center justify-center gap-1 hover:bg-[#171717] hover:text-white font-semibold"
          onClick={() => navigate('/courses')}
        >
          View All Courses <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PopularCourses;