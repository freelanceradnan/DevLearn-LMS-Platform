import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useGetAllCategoryQuery, useGetPubCoursesQuery } from '../Features/ApiSlice';
import CourseCard from '../Components/CourseCart';
import { assets } from '../assets/assets';

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

const CoursesPage = () => {
    const { data: allCategory } = useGetAllCategoryQuery();
    const {
        data: allCourses,
        isLoading: coursesLoading,
        isError: coursesError,
        isFetching,
        refetch,
    } = useGetPubCoursesQuery();

    const [activeBtn, setActiveBtn] = useState("All");

    // derive
    const categories = Array.isArray(allCategory?.[0]?.categories)
        ? allCategory[0].categories
        : [];
    const courses = Array.isArray(allCourses) ? allCourses : [];

    const filteredCourses =
        !activeBtn || activeBtn === "All"
            ? courses
            : courses.filter((item) => {
                  const courseCatId =
                      typeof item.categoryId === 'object'
                          ? item.categoryId?._id
                          : item.categoryId;
                  return courseCatId === activeBtn;
              });

    const filterBtnClass = (isActive) =>
        `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-xs active:scale-95 ${
            isActive
                ? 'bg-[#21CE3F] text-white shadow-md shadow-green-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`;

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen'>
            {/* Header Section */}
            <div className='text-center max-w-2xl mx-auto mb-10'>
                <h1 className='text-[31px] font-bold text-gray-900 mt-2'>
                    All Available Courses
                </h1>
                <p className='text-gray-500 mt-2 text-[16px]'>
                    Discover expert-led live courses designed to accelerate your career.
                </p>
            </div>

            {/* Category Filter Buttons*/}
            <div className="flex flex-wrap gap-2 items-center justify-center mb-10">
                <button
                    className={filterBtnClass(activeBtn === "All")}
                    onClick={() => setActiveBtn("All")}
                >
                    All Courses
                </button>

                {categories.map((item) => (
                    <button
                        key={item._id}
                        className={filterBtnClass(activeBtn === item._id)}
                        onClick={() => setActiveBtn(item._id)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            {/* 1. Loading */}
            {coursesLoading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            )}

            {/* 2. Error */}
            {!coursesLoading && coursesError && (
                <div className='flex flex-col items-center gap-3 py-16 text-center'>
                    <p className='text-red-500 text-sm'>
                        Course Loading Failed! Please try to reload!.
                    </p>
                    <button
                        onClick={refetch}
                        disabled={isFetching}
                        className='flex items-center gap-2 rounded-full bg-[#21CE3F] px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 disabled:opacity-60 transition-colors'
                    >
                        <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
                        Retry
                    </button>
                </div>
            )}

            {/* 3. Empty / 4. Success */}
            {!coursesLoading && !coursesError && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((cart, index) => (
                            <CourseCard key={cart._id} cart={cart} assets={assets} index={index} />
                        ))
                    ) : (
                        <div className='col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-4'>
                            <div className='text-gray-400 text-lg font-medium'>
                                {courses.length === 0
                                    ? 'Ekhono kono course nai.'
                                    : 'No courses found in this category.'}
                            </div>
                            {activeBtn !== "All" && (
                                <button
                                    onClick={() => setActiveBtn("All")}
                                    className='bg-[#21CE3F] text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm hover:bg-green-600 transition-colors'
                                >
                                    View All Courses
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoursesPage;