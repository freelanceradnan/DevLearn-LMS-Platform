import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import {  getMyAllCourse, getMyAllUsers, getMyInfo, updateMyAvatar, updateMyInfo, updateMyPassword } from "../Services/UserServices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const getInfo=CatchAsyncError(async(req,res,next)=>{
    const userId=req.user._id
    if(!userId){
    return next (new ErrorHandler("userid not found",400))
    }
    const result=await getMyInfo(userId)
    if(!result.success){
    return next (new ErrorHandler("failed to get user"))
    }
    res.status(200).json({success:true,data:result.info})
})
export const updateUserInfo=CatchAsyncError(async(req,res,next)=>{
    const {name,email}=req.body
    const userId=req.user._id
    if(!name || !email){
    return next(new ErrorHandler("name and email not found!"))
    }
    const result=await updateMyInfo(name,email,userId)
    if(result.success){
    res.status(200).json({message:"user updated success!"})
    }
})
export const updatePassword=CatchAsyncError(async(req,res,next)=>{
    const userId=req.user._id
    const {oldpassword,newpassword}=req.body
    if(!oldpassword && !newpassword){
     return next(new ErrorHandler("oldpass and newpass filled missing!"))
    }
    if(!userId){
    return next(new ErrorHandler('User id not found!'))
    }
    const result=await updateMyPassword(userId,oldpassword,newpassword)
    if(!result.success){
     return next(new ErrorHandler("oldpass and newpass update failed"))
    }
    res.status(200).json({success:true,message:"Password updated success!"})
})
export const UpdateUserAvatar = CatchAsyncError(async (req, res, next) => {
  const userId = req.user?._id;
  const { avatar } = req.body; 

  if (!userId) {
    return next(new ErrorHandler("User ID not found!", 400));
  }
  if (!avatar) {
    return next(new ErrorHandler("Avatar image is required!", 400));
  }

  const result = await updateMyAvatar(userId, avatar);

  if (!result.success) {
    return next(new ErrorHandler(result.message || "Failed to upload image", 500));
  }

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully!",
    user: result.user,
  });
});
//getallusers
export const GetAllUsers=CatchAsyncError(async(req,res,next)=>{
  const result=await getMyAllUsers()
 
  if(!result.success){
  return next(new ErrorHandler("Get all User failed"))
  }
  res.status(200).json({
    message:"Get all user done!",
    data:result.users
  })
})
export const GetAllCourse=CatchAsyncError(async(req,res,next)=>{
  const result=await getMyAllCourse()
  if(!result.success){
  return next(new ErrorHandler("failed to get all course"))
  }
  res.status(200).json({
    success:true,
    message:"Success to get All Course",
    data:result.courses
  })
})

