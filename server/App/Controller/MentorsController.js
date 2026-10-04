import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import {
  CreateMentorService,
  DeleteMentorService,
  GetMentorService,
} from "../Services/MentorsServices.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { UpdateMentorService } from './../Services/MentorsServices.js';

export const CreateMentor = CatchAsyncError(async (req, res, next) => {
 const payload=req.body

  if (
    !payload.name ||
    !payload.category ||
    !payload.description||
    !payload.students||
    !payload.courses
  ) {
    return next(new ErrorHandler("Please provides all data"));
  }
  await CreateMentorService(payload);
  res.status(200).json({
    success: true,
    message: "Create mentor success!",
  });
});
export const GetMentor = CatchAsyncError(async (req, res, next) => {
  const result = await GetMentorService();
  res.status(200).json({
    success: true,
    message: "Getting All Mentors Success!",
    data: result.data
  });
});
export const UpdateMentor = CatchAsyncError(async (req, res, next) => {
  const mentorId = req.params;
  const { body } = req.body;
  if (
    !data.name ||
    !data.category ||
    !data.description ||
    !data.enroll ||
    !data.course ||
    !data.links
  ) {
    return next(new ErrorHandler("Please provides all data"));
  }
  const result=await UpdateMentorService(mentorId,data)
   res.status(200).json({
    success: true,
    message: "updated  Mentor Success!",
  });
});
export const DeleteMentor = CatchAsyncError(async (req, res, next) => {
    const { mentorId } = req.params;
    if(!mentorId){
     return next(new ErrorHandler("delete mentors id not found!"))
    }
    await DeleteMentorService(mentorId)
    res.status(200).json({
        success:true,
        message:"delete mentors success!"
    })
});
