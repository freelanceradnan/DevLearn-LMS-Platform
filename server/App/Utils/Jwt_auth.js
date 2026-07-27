import dotenv from 'dotenv'
dotenv.config({path:'../../../server/.env'})
import jwt from "jsonwebtoken";
import { redis } from "./../Config/Redis.js";

export const signAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN || "",{expiresIn:'5m'});
};


export const signRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN || "",{expiresIn:'3d'});
};
export const accessTokenExpires = parseInt(
    process.env.ACCESS_TOKEN_EXPIRES || "300",
    10
  );
  export const refreshTokenExpires = parseInt(
    process.env.REFRESH_TOKEN_EXPIRES || "259200",
    10
  );
export const accesstokenOptions = {
    expires: new Date(Date.now() + accessTokenExpires * 1000),
    maxAge: accessTokenExpires * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
export const refreshtokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpires * 1000),
    maxAge: refreshTokenExpires * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

export const SendToken = (user, statusCode,res) => {
  const AccessToken = signAccessToken(user._id);
  const RefreshToken = signRefreshToken(user._id);

  // Redis user caching
  redis.set(user._id.toString(), JSON.stringify(user));

  

  

  if (process.env.NODE_ENV === "production") {
    accesstokenOptions.secure = true;
    refreshtokenOptions.secure = true;
  }

  res.cookie("access_token", AccessToken, accesstokenOptions);
  res.cookie("refresh_token", RefreshToken, refreshtokenOptions);
 
  return {success:true,user,AccessToken}
  
};