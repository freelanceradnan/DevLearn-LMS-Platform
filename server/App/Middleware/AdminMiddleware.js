
import { redis } from "../Config/Redis.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { CatchAsyncError } from "./CatchAsyncError.js";

export const AdminMiddlewares=CatchAsyncError(async(req,res,next)=>{
    const userId=req.user._id;
    if(!userId){
    return next(new ErrorHandler('user id not found!'))
    }
    const session=await redis.get(userId)
    const parsedUser = typeof session === 'string' ? JSON.parse(session) : session;

    if(parsedUser.role!=='admin'){
     return next(new ErrorHandler('You are not admin!'))
    }
    next()
})