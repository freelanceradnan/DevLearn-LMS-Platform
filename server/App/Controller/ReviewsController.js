
import { CatchAsyncError } from './../Middleware/CatchAsyncError.js';
import course from '../Models/Course.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const GetAllReviews=CatchAsyncError(async(req,res,next)=>{
    try {
       const getAllCourses = await course.find({}).sort({ createdAt: -1 });
       const reviews = getAllCourses?.flatMap((item) => item?.reviews || []) || [];
       if(!reviews){
       return next(new ErrorHandler("Failed to get course reviews"))
       }
       res.status(200).json({
        success:true,
        message:"Course reviews Getting Success",
        data:reviews
       })
    } catch (error) {
         return next(new ErrorHandler("Failed to get course reviews"))
    }
})