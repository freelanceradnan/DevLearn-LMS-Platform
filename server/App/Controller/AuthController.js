import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { ActiveMyUser, MyRegister } from "../Services/AuthServices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

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
