import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import Notification from "../Models/Notification.js";
import { getMyNotifications, updateMyNotificationStatus } from "../Services/NotificationSevices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const getNotifications=CatchAsyncError(async(req,res,next)=>{
    const result=await getMyNotifications()
    res.status(200).json({success:true,message:result.notifications})
})
export const updateNotifications=CatchAsyncError(async(req,res,next)=>{
    const notificationId=req.params.id
    if(!notificationId){
    return next (new ErrorHandler("notification id not found!"))
    } 
    const result=await updateMyNotificationStatus(notificationId)
    if(!result.success){
    return next (new ErrorHandler("failed to update notification status!"))
    }
    res.status(200).json({success:true,message:"Notification update successfully!",data:result.notifications})
})

export const GetUsersNotification=CatchAsyncError(async(req,res,next)=>{
    const userId=req.user._id
   if(!userId){
    return next (new ErrorHandler("User id not found!"))
   }
   const getMyNotifications = await Notification.find({ user_id: userId }).sort({ createdAt: -1 });
   if(!getMyNotifications){
    return next (new ErrorHandler("Notification not found!"))
   }
   res.status(200).json({
    success:true,
    message:'Notification Gets Success',
    getMyNotifications
   })
})
export const UpdateNotificationStatus=CatchAsyncError(async(req,res,next)=>{
    const {notificationId}=req.body
    if(!notificationId){
    return next(new ErrorHandler("Notification id not found!"))
    }
    console.log(notificationId)
    const updateStatus=await Notification.findByIdAndUpdate(notificationId,{
        $set:{status:"read"}
    })
    res.status(200).json({success:true,message:"Notification update success!"})
})
export const UpdateAllNotificationStatus=CatchAsyncError(async(req,res,next)=>{
    const userId=req.user._id
    if(!userId){
    return next(new ErrorHandler("User Id Not Found!"))
    }
   
    const updateStatus = await Notification.updateMany(
    { user_id: userId, status: "unread" }, 
    { $set: { status: "read" } }       
);
    res.status(200).json({success:true,message:"Notification update success!"})
})