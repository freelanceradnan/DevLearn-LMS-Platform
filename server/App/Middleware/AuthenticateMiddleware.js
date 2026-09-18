import ErrorHandler from "../Utils/ErrorHandler.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { redis } from "../Config/Redis.js";
import { User } from "../Models/Users.js";
import { decode } from "punycode";
dotenv.config({path:path.resolve(process.cwd(),'.env')})

const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const access_token = req?.cookies?.access_token;

  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired access token", 401));
  }

  const caching = await redis.get(decoded.id);
  let data={}
 if(caching){
 data=JSON.parse(caching)
 }
 else{
 data=await User.findById(decoded.id)
 redis.set(decode.id,JSON.stringify(data))
 }
  // if (!user) {
  //   return next(new ErrorHandler("User session expired Please login to access this", 400));
  // }

  req.user = data;
  next();
});
export default isAuthenticated