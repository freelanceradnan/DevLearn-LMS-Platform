import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";

import LayoutModels from '../Models/Layout.js';
const { Faq } = LayoutModels;
export const GetFaq = CatchAsyncError(async (req, res, next) => {
    const getAllFaq = await Faq.find({}).lean();
    
    res.status(200).json({
        success: true,
        message: "Successfully retrieved all FAQs",
        data: getAllFaq
    });
});
export const UpdateFaq = CatchAsyncError(async (req, res, next) => {
    const faqBody=req.body

    try {
      
  const faqData = await Faq.findOneAndUpdate(
    {}, 
    { 
      $set: { faqSections: faqBody } 
    },
    { 
      new: true,  
      upsert: true  
    }
  );
  res.status(201).json({ success: true, data: faqData });
} catch (error) {
  res.status(400).json({ success: false, message: error.message });
}
});