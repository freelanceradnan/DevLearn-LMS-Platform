import { CatchAsyncError } from "../Middleware/CatchAsyncError.js"
import course from "../Models/Course.js"
import Orders from "../Models/Orders.js"
import { User } from "../Models/Users.js"
import { generateLast12MonthsData } from "../Utils/GetAnalytics.js"

export const getUsersAnalytics=CatchAsyncError(async(req,res,next)=>{
    const users=await generateLast12MonthsData(User)
    res.status(200).json({
        success:true,
        message:"Users analysis found!",
        users
    })
})
export const getCourseAnalytics=CatchAsyncError(async(req,res,next)=>{
    const course=await generateLast12MonthsData(course)
    res.status(200).json({
        success:true,
        message:"Users analysis found!",
        course
    })
})
export const getOrdersAnalytics=CatchAsyncError(async(req,res,next)=>{
    const orders=await generateLast12MonthsData(Orders)
    res.status(200).json({
        success:true,
        message:"Users analysis found!",
        orders
    })
})
