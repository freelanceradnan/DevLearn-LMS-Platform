import React, { useEffect, useState } from 'react';
import { useGetAllCategoryQuery, useGetPubCoursesQuery } from '../Features/ApiSlice';
import CourseCard from '../Components/CourseCart';
import { assets } from '../assets/assets';

const CoursesPage = () => {
    const { data: allCategory, isLoading: categoryLoading } = useGetAllCategoryQuery();
    const { data: allCourses, isLoading: coursesLoading } = useGetPubCoursesQuery();
    
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [activeBtn, setActiveBtn] = useState("All");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (allCategory) {
            setCategories(allCategory[0]?.categories || []);
        }
    }, [allCategory]);

    useEffect(() => {
        if (allCourses?.length > 0) {
            const filteredData = (!activeBtn || activeBtn === "All")
                ? allCourses 
                : allCourses.filter((item) => {
                    const courseCatId = typeof item.categoryId === 'object' 
                        ? item.categoryId?._id 
                        : item.categoryId;
                        
                    return courseCatId === activeBtn;
                });

            setFilteredCourses(filteredData);
        } else {
            setFilteredCourses([]);
        }
    }, [allCourses, activeBtn]); 

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white min-h-screen'>
            
            {/* Header Section */}
            <div className='text-center max-w-2xl mx-auto mb-10'>
                <span className='text-xs font-semibold uppercase tracking-wider text-[#21CE3F] bg-green-50 px-3 py-1 rounded-full'>
                    Explore Programs
                </span>
                <h1 className=' text-[14px] sm:text-4xl font-bold text-gray-900 mt-3'>
                    All Available Courses
                </h1>
                <p className='text-gray-500 mt-2 text-sm sm:text-base'>
                    Discover expert-led live courses designed to accelerate your career.
                </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 items-center justify-center mb-10">
                <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-xs active:scale-95 ${
                        activeBtn === "All" 
                            ? 'bg-[#21CE3F] text-white shadow-md shadow-green-100' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveBtn("All")}
                >
                    All Courses
                </button>

                {categories?.map((item) => (
                    <button 
                        key={item._id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-xs active:scale-95 ${
                            activeBtn === item._id 
                                ? 'bg-[#21CE3F] text-white shadow-md shadow-green-100' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveBtn(item._id)} 
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            {/* Loading  */}
            {(categoryLoading || coursesLoading) && (
                <div className='flex justify-center items-center py-20'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#21CE3F]'></div>
                </div>
            )}

            {/* Empty  */}
            {!categoryLoading && !coursesLoading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((cart, index) => (
                            <CourseCard key={cart._id} cart={cart} assets={assets} index={index}/>
                        ))
                    ) : (
                        <div className='col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-4'>
                            <div className='text-gray-400 text-lg font-medium'>
                                No courses found in this category.
                            </div>
                            <button 
                                onClick={() => setActiveBtn("All")} 
                                className='bg-[#21CE3F] text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm hover:bg-green-600 transition-colors'
                            >
                                View All Courses
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoursesPage;