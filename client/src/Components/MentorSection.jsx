import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCw, SearchX } from 'lucide-react';
import { useGetMentorQuery } from '../Features/ApiSlice';
import MentorsCart from './MentorsCart';

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

const MentorSection = () => {
  const { data: allMentors, isLoading, isError, isFetching, refetch } = useGetMentorQuery();
  const navigate = useNavigate();

 //backend response
  const mentors = Array.isArray(allMentors?.data) ? allMentors.data.slice(0, 4) : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 bg-[#FCFCFC]">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-[#09C82C] text-center text-[14px] uppercase font-bold">Mentors</h1>
        <h2 className="text-[31px] font-semibold text-[#171717]">
          Learn From Industry <span className="text-[#09C82C]">Experts</span>
        </h2>
        <p className="text-[#7d7e83] max-w-[600px] text-center text-[16px]">
          Our mentors are industry leaders with years of experience in their respective fields.
        </p>
      </div>

      <div className="py-10">
        {/* 1. Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonMentor key={i} />
            ))}
          </div>
        )}

        {/* 2. Error */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-red-500 text-sm">
             Mentors Load Failed !Please Try again!
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
        {!isLoading && !isError && mentors.length === 0 && (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
            <SearchX size={18} />
            <p className="text-sm">No Mentors Found!</p>
          </div>
        )}

        {/* 4. Success */}
        {!isLoading && !isError && mentors.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.map((item, index) => (
              <MentorsCart key={item._id || index} item={item} index={index} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          className="border rounded-full flex py-1 px-3 text-[15px] items-center justify-center gap-1 hover:bg-[#171717] hover:text-white font-semibold"
          onClick={() => navigate('/mentors')}
        >
          View All Mentors <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default MentorSection;