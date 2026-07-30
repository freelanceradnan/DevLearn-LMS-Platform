import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import customCloudinary from "../Config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import {  AddMyQuestion, AddMyReply, CourseService, GetMyAllCourse, GetMySingleCourse, GetMyUserCourse, UpdateMyCourse } from "../Services/CourseServices.js";
import course from "../Models/Course.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const CreateCourse=CatchAsyncError(async(req,res,next)=>{
    const {data}=req.body
   if(data.thumbnail){
     const myCloud = await cloudinary.uploader.upload(avatar, {
          folder: 'avatars-lms',
          width: 150,
          crop: 'scale',
        });
    const data={
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    }
   }
   const result=await CourseService(data,res)
   
})
export const UpdateCourse = CatchAsyncError(async (req, res, next) => {
  let { data } = req.body;
  const courseId = req.params.id;

  if (Array.isArray(data)) {
    data = data[0];
  }

  const result = await UpdateMyCourse(courseId, data);

  if (!result.success) {
    return next(new ErrorHandler(result.message || "Course update failed", 400));
  }

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    course: result.courseInfo,
  });
});
export const GetSingleCourse=CatchAsyncError(async(req,res,next)=>{
   const courseId = req.params.id;
   if(!courseId){
   return next(new ErrorHandler("Course id not found!"))
   }
  const result=await GetMySingleCourse(courseId)
  if(!result.success){
   return next (new ErrorHandler("unable to get course info"))
  }
 res.status(200).json({
  success:true,
  message:"Getting Course Success!",
  data:result.getCourse
 })
})
export const GetAllCourse=CatchAsyncError(async(req,res,next)=>{
  
  const result=await GetMyAllCourse()
  if(!result.success){
   return next (new ErrorHandler("unable to get course info"))
  }
 res.status(200).json({
  success:true,
  message:"Getting Course Success!",
  data:result.getCourse
 })
})
export const GetUserCourse=CatchAsyncError(async(req,res,next)=>{
  const courseList=req.user.Courses
  const courseId=req.params.id
  if(!courseId){
  return next(new ErrorHandler("Course Id not found!"))
  }
  const result=await GetMyUserCourse(courseList,courseId)
  if(!result.success){
    return next(new ErrorHandler("You are not eligible to access this course!"))
  }
  res.status(200).json({success:true,message:'course access success',data:result.coursedata})
})
export const AddQuestions=CatchAsyncError(async(req,res,next)=>{
  const {contentId,question,courseId}=req.body
  const user=req?.user
  if(!contentId ||!question || !courseId){
    return next (new ErrorHandler("ContentId,question and courseId are Required!"))
  }
  const result=await AddMyQuestion(contentId,question,courseId,user)
  if(!result.success){
   return next (new ErrorHandler("Add question failed!"))
  }
  res.status(200).json({success:true,message:"Add question done!"})
})
export const AddReplies=CatchAsyncError(async(req,res,next)=>{
  const { contentId, reply, courseId, questionId } = req.body;
const user = req?.user;
if (!contentId || !reply || !courseId || !questionId) {
  return next(new ErrorHandler("contentId, reply, courseId, and questionId are required!", 400));
}
  const result=await AddMyReply(contentId,reply,courseId,questionId,user)
  if(!result.success){
   return next (new ErrorHandler("Add question failed!"))
  }
  res.status(200).json({success:true,message:"Add replies done!",data:result.fullcourse})
})