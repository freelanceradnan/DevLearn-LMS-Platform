import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import Layout from "../Models/Layout.js";
const { Category } = Layout;
export const getAllCategories = CatchAsyncError(async (req, res, next) => {
  const getCategories = await Category.find({});
  res.status(200).json({
    success: true,
    message: "All category Fetch success!",
  });
});

export const updateCategory = CatchAsyncError(async (req, res, next) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      success: false,
      message: "Data must be an array of objects",
    });
  }

  const updateData = await Category.findOneAndUpdate(
    {},
    { $set: { categories: data } },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Category Updated Success!",
    data: updateData,
  });
});