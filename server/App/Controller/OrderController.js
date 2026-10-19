import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import Orders from "../Models/Orders.js";
import { User } from "../Models/Users.js";
import { CreateMyOrder, GetMyOrder } from "../Services/OrderServices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export  const CreateOrder=CatchAsyncError(async(req,res,next)=>{
const {course_id,payment_info}=req.body
const user=req?.user
if(!course_id || !payment_info){
    return next(new ErrorHandler("course id or payment info missing"))
}
if(!user){
    return next(new ErrorHandler("Your are not login!Please login first"))
}
const result=await CreateMyOrder(user,course_id,payment_info)
if(!result.success){
    return next(new ErrorHandler("Failed to create order"))
}
res.status(201).json({
    success:true,
    message:"Order created success!",
    data:result.createOrder
})

})
export const getUserOrder=CatchAsyncError(async(req,res,next)=>{
   
        const userid=req.user._id
        if(!userid){
        return next(new ErrorHandler("userid not found to get order!"))
        }
        const result=await GetMyOrder(userid)
        res.status(200).json({
        success:true,
        message:"user order get success",
        data:result
        })
    
})
export const getAdminOrder=CatchAsyncError(async(req,res,next)=>{
    try {
    const id=req.user._id
    const data=await User.findById(id)
    if(data.role!=='admin'){
    return next(new ErrorHandler("You are not admin!"))
    }
    const allOrder = await Orders.find({ }).sort({ createdAt: -1 }).lean();
    if(!allOrder){
    return next(new ErrorHandler("Order not found!"))
    }
    res.status(200).json({
    success:true,
    message:"orders fetch success",
    data:allOrder
    })
    } catch (error) {
         res.status(400).json({
    success:false,
    message:"orders fetch failed",
    })
    }
})