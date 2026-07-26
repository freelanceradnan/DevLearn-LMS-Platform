import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { MyRegister } from "../Services/AuthServices.js";
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
