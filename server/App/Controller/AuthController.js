
import dotenv from 'dotenv'
import path from 'path'
import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { ActiveMyUser, MyLogin, MyRegister } from "../Services/AuthServices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { accesstokenOptions, refreshtokenOptions, SendToken } from "../Utils/Jwt_auth.js";
import  jwt from 'jsonwebtoken';
import { redis } from '../Config/Redis.js';
dotenv.config({path:path.resolve(process.cwd()+'.env')})
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
  const userId=req?.user?._id
  redis.del(userId)
  res.status(200).json({
    success:true,
    message:"logout success!"
  })
})
export const updateToken = CatchAsyncError(async (req, res, next) => {
  const refresh_token = req?.cookies?.refresh_token;

  if (!refresh_token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }

  let decoded;
  try {
    decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired refresh token", 400));
  }


  const session = await redis.get(decoded.id);

 
  if (!session) {
    return next(new ErrorHandler("Session expired, please login again", 400));
  }

  const user = JSON.parse(session);


  const AccessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: "5m" }
  );

  const RefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: "3d" }
  );

  //Set cookies
  res.cookie("access_token", AccessToken, accesstokenOptions);
  res.cookie("refresh_token", RefreshToken, refreshtokenOptions);


  res.status(200).json({
    success: true,
    accessToken: AccessToken,
  });
});