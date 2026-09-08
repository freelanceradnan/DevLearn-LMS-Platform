import mongoose from "mongoose";
import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";

import cloudinary from "./../Config/Cloudinary.js";
import LayoutModels from '../Models/Layout.js';
const { Hero } = LayoutModels;
export const UpdateHero = CatchAsyncError(async (req, res, next) => {
  const { data } = req.body;
  const id = req.params.id;

  const currentHero = await Hero.findById(id);

  if (!currentHero) {
    return res.status(404).json({
      success: false,
      message: "Hero section data not found",
    });
  }

  const isNewImageUploaded =
    data?.image?.public_id &&
    data?.image?.public_id !== currentHero?.image?.public_id;

  if (isNewImageUploaded && currentHero?.image?.public_id) {
    await cloudinary.uploader.destroy(currentHero.image.public_id, {
      resource_type: "image",
      invalidate: true,
    });
  }

  const updatedHero = await Hero.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

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
    data,
  });
});
