import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import {User} from '../Models/Users.js'

export const GetAdminInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.user._id;
    if (!id) {
      return next(new ErrorHandler("Id not found For fetch data"));
    }
    const info = await User.findById(id);
    if (!info) {
      return next(new ErrorHandler("data not found For fetch data"));
    }
    res.status(200).json({
      success: true,
      message: "Data fetch success!",
      data: info,
    });
  } catch (error) {}
});
export const UpdateAdminInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.user._id;

    if (!id) {
      return next(new ErrorHandler("Id not found For fetch data", 400));
    }

//update info
    const updateInfo = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Admin info updated successfully",
      updateInfo,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
