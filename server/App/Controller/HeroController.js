import mongoose from "mongoose";
import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import Hero from "../Models/Layout.js";

export const UpdateHero = CatchAsyncError(async (req, res, next) => {
  const  {data}  = req.body;
  const id=req.params.id


  


  const updatedHero = await Hero.findByIdAndUpdate(
    id,
    { $set: data }, 
    { new: true, runValidators: true }
  );

  if (!updatedHero) {
    return res.status(404).json({
      success: false,
      message: "Hero section data not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Hero section updated successfully!",
    updatedHero,
  });
});

export const GetHeroInfo = CatchAsyncError(async (req, res, next) => {
   
    const data = await Hero.find({}).lean(); 
    
    res.status(200).json({
        success: true,
        data
    });
});