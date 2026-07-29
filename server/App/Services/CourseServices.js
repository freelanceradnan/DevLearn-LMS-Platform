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