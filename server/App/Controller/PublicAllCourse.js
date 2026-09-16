import { redis } from "../Config/Redis.js";
import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import course from "../Models/Course.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const PublicAllCourse=CatchAsyncError(async(req,res,next)=>{
    try {
        const isCashing=await redis.get('allcourses')
       
        if(isCashing){
        
         const cachingCourses=JSON.parse(isCashing)
         if(Array.isArray(cachingCourses) && cachingCourses.length>0){
          return res.status(200).json({
            success:true,
            message:"Public course get success!",
            data:cachingCourses
          }) 
         }
        }
        const getAllCourse=await course.find().select("-courseData.videoUrl -prerequisites -benefits -demoUrl -tags -description")
        if(getAllCourse.length>0){
          await redis.set('allcourses',JSON.stringify(getAllCourse))
        }
        res.status(200).json({
        success:true,
        message:'Get public courses success!',
        data:getAllCourse
        })
    } catch (error) {
        
    }
})
export const PublicSingleCourseDetails=CatchAsyncError(async(req,res,next)=>{
    try {
      const {id}=req.params

      if(!id){
      return next(new ErrorHandler("Id messing !Failed to get Single Course!"))
      }
      const courseDetails=await course.findById(id).select("-courseData.videoUrl -courseData.links -courseData.questions")
      if(courseDetails){
      return res.status(200).json({
      success:true,
      message:'Course Info Getting Success!',
      data:courseDetails
      })
      }
    } catch (error) {
      res.status(400).json({
        success:false,
        message:"Failed to get Course Info"
      })
    }
})