import React, { useEffect, useState } from 'react';
import { useGetAllCategoryQuery, useGetMentorQuery, useGetPubCoursesQuery } from '../Features/ApiSlice';
import CourseCard from '../Components/CourseCart';
import { assets } from '../assets/assets';
import MentorsCart from '../Components/MentorsCart';

const MentorPage = () => {
    const { data: allCategory, isLoading: categoryLoading } = useGetAllCategoryQuery();
    const { data: allMentors, isLoading: coursesLoading } = useGetMentorQuery();
    console.log(allMentors)
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [activeBtn, setActiveBtn] = useState("All");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (allCategory) {
            setCategories(allCategory[0]?.categories || []);
        }
    }, [allCategory]);

   useEffect(() => {
           if (allMentors?.data?.length > 0) {
               const filteredData = (!activeBtn || activeBtn === "All")
                   ? allMentors.data
                   : allMentors.data.filter((item) => {
                
                       const courseCatId = typeof item.category === 'object' 
                           ? item.category
                           : item.category;
                           
                       return courseCatId === activeBtn;
                   });
   
               setFilteredMentors(filteredData);
           } else {
               setFilteredMentors([]);
           }
       }, [allMentors, activeBtn]); 

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white min-h-screen'>
            
            {/* Header Section */}
           <div className='text-center max-w-2xl mx-auto mb-10'>
               
                <h1 className=' text-[31px] font-bold text-gray-900 mt-2'>
                    All Available Mentors
                </h1>
                <p className='text-gray-500 mt-2 text-[16px]'>
                    Discover mentors with best courses for your career.
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
                    All Mentors
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
                    {filteredMentors.length > 0 ? (
                        filteredMentors.map((item, index) => (
                           <MentorsCart item={item} index={index}/>
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
                                View All Mentor
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MentorPage;