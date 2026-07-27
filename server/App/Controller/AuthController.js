import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { ActiveMyUser, MyLogin, MyRegister } from "../Services/AuthServices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { SendToken } from "../Utils/Jwt_auth.js";

export const Registration = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all required fields!", 400));
  }


  const result = await MyRegister(name, email, password);


  if (!result.success) {
    return next(new ErrorHandler(result.message, 500));
  }


  res.status(201).json({
    success: true,
    message: result.message,
    activationToken: result.activationToken,
  });
});
export const ActiveUser=CatchAsyncError(async(req,res,next)=>{
  const {activation_code,activation_token}=req.body
  if(!activation_code || !activation_token){
    return next(new ErrorHandler("activation code or activation token missing"))
  }
  const result=await ActiveMyUser(activation_code,activation_token)
  if(!result.success){
  return next(new ErrorHandler("Error to activated user",400))
  }
  res.status(201).json({
    success:true,
    message:"User Activated success"
  })
})
export const UserLogin=CatchAsyncError(async(req,res,next)=>{
  const {email,password}=req.body
  if(!email || !password){
    return next(new  ErrorHandler("enter email password to login",400))
  }
  const result=await MyLogin(email,password,res)
  if(!result.success){
    return next(new ErrorHandler("failed to login",400))
  }

  res.status(200).json({
    success:true,
    message:"User login success!",
    data:result.user,
    AccessToken:result.AccessToken
  })
})
export const LogoutUser=CatchAsyncError(async(req,res,next)=>{
  res.clearCookie("access_token","",{maxAge:1})
  res.clearCookie("refresh_token","",{maxAge:1})
  res.status(200).json({
    success:true,
    message:"logout success!"
  })
})