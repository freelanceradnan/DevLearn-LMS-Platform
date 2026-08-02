import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import { v2 as cloudinary } from "cloudinary";
import Layout from "../Models/Layout.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
export const CreateLayout = CatchAsyncError(async (req, res, next) => {
  const { type } = req.body;
  const isTypeExist = await Layout.exists({ type });

  if(isTypeExist){
    return next(new ErrorHandler(`${type} already exists!`))
  }
  if (type === "Banner") {
    const { image, title, subTitle } = req.body;
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "layout"
    });
    const banner={
        image:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
        title,
        subTitle
    }
    await Layout.create(banner)
  }
  if(type==='FAQ'){
    const {faq}=req.body
    const faqItems=await Promise.all(
      faq.map(async(item)=>{
        return {
          question:item.question,
          answer:item.answer
        }
      })
    )
    await Layout.create({type:"FAQ",faq:faqItems})
  }
  if(type==='Categories'){
    const {categories}=req.body;
    const categoriesItems=await Promise.all(
      categories.map(async(item)=>{
        return{
          title:item.title
        }
      })
    )
    await Layout.create({
      type:"categories",
      categories:categoriesItems
    })
  }
  res.status(200).json({
    success:true,
    message:"Layout created successFully!"
  })
});
export const editLayout=CatchAsyncError(async(req,res,next)=>{
   const { type } = req.body;

  if (type === "Banner") {
    const bannerData=await Layout.findOne({type:"Banner"})
    const { image, title, subTitle } = req.body;
    if(bannerData){
      await cloudinary.uploader.destroy(bannerData.image.public_id)
    }
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "layout"
    });
    const banner={
        image:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
        title,
        subTitle
    }
    await Layout.findByIdAndUpdate(bannerData.id,{banner})
  }
  if(type==='FAQ'){
    const {faq}=req.body
  const faqItemsData=await Layout.findOne({type:"FAQ"})
    const faqItems=await Promise.all(
      faq.map(async(item)=>{
        return {
          question:item.question,
          answer:item.answer
        }
      })
    )
    await Layout.findByIdAndUpdate(faqItemsData.id,{type:"FAQ",faq:faqItems})
  }
  if(type==='Categories'){
    const {categories}=req.body;
    const categoriesData=await Layout.findOne({type:"categories"})
    const categoriesItems=await Promise.all(
      categories.map(async(item)=>{
        return{
          title:item.title
        }
      })
    )
    await Layout.findByIdAndUpdate(categoriesData._id,{
      type:"categories",
      categories:categoriesItems
    })
  }
  res.status(200).json({
    success:true,
    message:"Layout updated successFully!"
  })
})
export const GetLayoutByType=CatchAsyncError(async(req,res,next)=>{
  const type=req.body.type
  const layout=await Layout.findOne({type})
  res.status(200).json({
    success:true,
    message:"Success to get Layout!",
    data:layout
  })
})