import React from 'react';
import CoursePlayer from './CoursePlayer';

const CoursePreview = ({createCourseHandler,courseData}) => {
    return (
        <div className='m-auto py-5 mb-5'>
            <div className="">
            <div className="w-full mt-10">
                <CoursePlayer videoUrl={courseData.demoUrl} />
            </div>
            </div>
            
        </div>
    );
};

export default CoursePreview;