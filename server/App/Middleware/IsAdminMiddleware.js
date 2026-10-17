import ErrorHandler from "../Utils/ErrorHandler.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { User } from "../Models/Users.js";
dotenv.config({path:path.resolve(process.cwd(),'.env')})
export const isAdminAuthenticated = CatchAsyncError(async (req, res, next) => {
  const admin_access_token = req?.cookies?.admin_access_token;

  if (!admin_access_token) {
    return next(new ErrorHandler("Please login as an admin to access this resource", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(admin_access_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired admin token", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("Admin not found", 404));
  }

  
  if (user.role !== "admin") {
    return next(new ErrorHandler("You are not authorized to access this resource", 403));
  }

  req.user = user;
  next();
});