import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { CreateMyOrder } from "../Services/OrderServices.js";
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