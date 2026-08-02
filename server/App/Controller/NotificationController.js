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
