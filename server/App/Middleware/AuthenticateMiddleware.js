import ErrorHandler from "../Utils/ErrorHandler.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { redis } from "../Config/Redis.js";
import { User } from "../Models/Users.js";
import { decode } from "punycode";
dotenv.config({path:path.resolve(process.cwd(),'.env')})

export const isAuthenticated = CatchAsyncError(async (req, res, next) => {

  const access_token = req?.cookies?.access_token;
  const admin_access_token = req?.cookies?.admin_access_token;

  let token = null;
  let secret = null;

  if (admin_access_token) {
    token = admin_access_token;
    secret = process.env.ACCESS_TOKEN; 
  } 
  else if (access_token) {
    token = access_token;
    secret = process.env.ACCESS_TOKEN;
  }

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired access token", 401));
  }

  const caching = await redis.get(decoded.id);
  let data = {};

  if (caching) {
    data = JSON.parse(caching);
  } else {
    data = await User.findById(decoded.id);
    if (!data) {
      return next(new ErrorHandler("User session expired, please login again", 404));
    }
    await redis.set(decoded.id, JSON.stringify(data));
  }

  req.user = data;
  next();
});
export default isAuthenticated