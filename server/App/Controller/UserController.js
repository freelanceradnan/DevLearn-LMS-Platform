import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { getMyInfo } from "../Services/UserServices.js";
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