import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPubCoursesQuery } from '../Features/ApiSlice';
import CourseCard from '../Components/CourseCart';
import { Search, ArrowLeft, BookOpen } from 'lucide-react'; 

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || "";
    const { data: AllCourses, isLoading } = useGetPubCoursesQuery();
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
      if (Array.isArray(AllCourses) && AllCourses.length > 0) {
        const filteredData = AllCourses.filter((c) => 
          c.name.toLowerCase().includes(search.toLowerCase().trim())
        );
        setSearchData(filteredData);
      }
    }, [AllCourses, search]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">
            {/* Search Header Banner */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl mb-8 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                        <Search className="w-7 h-7 text-indigo-400" />
                        Search Results for: <span className="text-indigo-300">"{search}"</span>
                    </h1>
                    <p className="text-gray-300 text-sm mt-1">
                        {!isLoading && `Found ${searchData.length} matching course(s) for your query.`}
                    </p>
                </div>
                <button 
                    onClick={() => navigate('/courses')}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition duration-200 border border-white/10"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to All Courses
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            )}

            {/* Results  Empty State */}
            {!isLoading && (
                searchData.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {searchData.map((cart, index) => (
                            <CourseCard key={cart._id || index} cart={cart} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
                        <div className="inline-flex p-4 bg-indigo-50 dark:bg-slate-800 rounded-full text-indigo-500 mb-4">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            No Course Found matching "{search}"
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto mb-6">
                            We couldn't find any courses matching your search. Try searching with different keywords or explore our full catalog.
                        </p>
                        <button 
                            onClick={() => navigate('/courses')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition duration-200"
                        >
                            Browse All Courses
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default SearchPage;