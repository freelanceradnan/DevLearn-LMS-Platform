import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useGetAllCategoryQuery, useGetMentorQuery } from '../Features/ApiSlice';
import MentorsCart from '../Components/MentorsCart';

function SkeletonMentor() {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm animate-pulse">
            <div className="h-48 w-full rounded-xl bg-gray-200" />
            <div className="mt-4 h-5 w-2/3 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            <div className="mt-4 flex gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
        </div>
    );
}

const MentorPage = () => {
    const { data: allCategory } = useGetAllCategoryQuery();
    const {
        data: allMentors,
        isLoading: mentorsLoading,
        isError: mentorsError,
        isFetching,
        refetch,
    } = useGetMentorQuery();

    const [activeBtn, setActiveBtn] = useState("All");

    //  derive
    const categories = Array.isArray(allCategory?.[0]?.categories)
        ? allCategory[0].categories
        : [];
    const mentors = Array.isArray(allMentors?.data) ? allMentors.data : [];

    const filteredMentors =
        !activeBtn || activeBtn === "All"
            ? mentors
            : mentors.filter((item) => {
                 
                  const mentorCatId =
                      typeof item.category === 'object' && item.category !== null
                          ? item.category._id
                          : item.category;
                  return mentorCatId === activeBtn;
              });

    const filterBtnClass = (isActive) =>
        `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-xs active:scale-95 ${
            isActive
                ? 'bg-[#21CE3F] text-white shadow-md shadow-green-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`;

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white min-h-screen'>
            {/* Header Section */}
            <div className='text-center max-w-2xl mx-auto mb-10'>
                <h1 className='text-[31px] font-bold text-gray-900 mt-2'>
                    All Available Mentors
                </h1>
                <p className='text-gray-500 mt-2 text-[16px]'>
                    Discover mentors with best courses for your career.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center justify-center mb-10">
                <button
                    className={filterBtnClass(activeBtn === "All")}
                    onClick={() => setActiveBtn("All")}
                >
                    All Mentors
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
            {mentorsLoading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonMentor key={i} />
                    ))}
                </div>
            )}

            {/* 2. Error */}
            {!mentorsLoading && mentorsError && (
                <div className='flex flex-col items-center gap-3 py-16 text-center'>
                    <p className='text-red-500 text-sm'>
                        Mentors Loading Failed! Please try again!
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
            {!mentorsLoading && !mentorsError && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {filteredMentors.length > 0 ? (
                        filteredMentors.map((item, index) => (
                            <MentorsCart key={item._id || index} item={item} index={index} />
                        ))
                    ) : (
                        <div className='col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-4'>
                            <div className='text-gray-400 text-lg font-medium'>
                                {mentors.length === 0
                                    ? 'No mentors Found!'
                                    : 'No mentors found in this category.'}
                            </div>
                            {activeBtn !== "All" && (
                                <button
                                    onClick={() => setActiveBtn("All")}
                                    className='bg-[#21CE3F] text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm hover:bg-green-600 transition-colors'
                                >
                                    View All Mentors
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MentorPage;