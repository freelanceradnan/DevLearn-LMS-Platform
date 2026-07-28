import ErrorHandler from "../Utils/ErrorHandler.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { redis } from "../Config/Redis.js";
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

  const user = await redis.get(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User session expired or not found", 400));
  }

  req.user = JSON.parse(user);
  next();
});
export default isAuthenticated