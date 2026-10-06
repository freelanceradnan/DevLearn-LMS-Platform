import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import Policy from "../Models/PolicyModel.js";

export const GetAllPolicy = CatchAsyncError(async (req, res, next) => {
    const getAllPolicy = await Policy.find({}).lean();
    
    res.status(200).json({
        success: true,
        message: "Successfully retrieved all FAQs",
        data: getAllPolicy
    });
});
export const UpdatePolicy = CatchAsyncError(async (req, res, next) => {
    const policyData=req.body

    try {
      
  const updatePolicy = await Policy.findOneAndUpdate(
    {}, 
    { 
      $set: { policySection: policyData } 
    },
    { 
      new: true,  
      upsert: true  
    }
  );
  
  res.status(201).json({ success: true, data: updatePolicy });
} catch (error) {
  res.status(400).json({ success: false, message: error.message });
}
});