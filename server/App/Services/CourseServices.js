import { redis } from "../Config/Redis.js"
import course from "../Models/Course.js"
import {v2 as cloudinary} from 'cloudinary'
export const  CourseService=async(data,res)=>{
const createcourse=await course.create(data)
res.status(201).json({
    success:true,
    createcourse
})
}
export const UpdateMyCourse = async (courseId, data) => {
  try {
    if(data.thumbnail && typeof data.thumbnail === "string") {
     
        await cloudinary.uploader.destroy(data?.thumbnail?.public_id);
      

      const myCloud = await cloudinary.uploader.upload(data.thumbnail, {
        folder: 'avatars-lms',
        width: 150,
        crop: 'scale',
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
      
    }
    
    const courseInfo = await course.findByIdAndUpdate(
      courseId,
      { $set: data },
      {returnDocument:'after'}
    );

    return {
      success: true,
      courseInfo,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const GetMySingleCourse=async(CourseId)=>{
  //redis get
  const isCaching=await redis.get(CourseId)
  if(isCaching){
  const getCourse=JSON.parse(isCaching)
  return {success:true,getCourse}
  }else{
    const getCourse = await course.findById(CourseId).select(
  "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
);
  const caching=await redis.set(CourseId,JSON.stringify(getCourse))
  return {
    success:true, 
    getCourse
  }
  }

}
export const GetMyAllCourse=async()=>{
   const caching=await redis.get('allcourses')
   if(caching){
    const allcourses=JSON.parse(caching)
    return {success:true,getCourse:allcourses}
   }
   else{
     const getCourse = await course.find().select(
  "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
);

const setcourses=await redis.set("allcourses",JSON.stringify(getCourse))
return {
  success:true,
  getCourse
}
   }

}
export const GetMyUserCourse=async(courseList,courseId)=>{
  const courseExists=courseList.find((course)=>course._id.toString()===courseId)
  if(!courseExists){
    throw new Error('You are not allowed to access this course!')
  }
  const fullcourse=await course.findById(courseId)
  const coursedata=fullcourse.courseData

  return {success:true,coursedata}
}