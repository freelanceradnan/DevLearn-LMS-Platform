import ErrorHandler from "../Utils/ErrorHandler.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { redis } from "../Config/Redis.js";
import { User } from "../Models/Users.js";
import { decode } from "punycode";
dotenv.config({path:path.resolve(process.cwd(),'.env')})

export const isUserAuthenticated = CatchAsyncError(async (req, res, next) => {
  const access_token = req?.cookies?.access_token;

  if (!access_token) {
    return next(new ErrorHandler("Please login as a user to access this resource", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired access token", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  req.user = user;
  next();
});
export default isUserAuthenticated