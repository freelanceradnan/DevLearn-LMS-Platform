import mongoose from "mongoose";
import { redis } from "../Config/Redis.js";
import course from "../Models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import sendMail from "../Utils/EmailSent.js";
import { User } from "../Models/Users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const CourseService = async (data, res) => {
  const createcourse = await course.create(data);
  res.status(201).json({
    success: true,
    createcourse,
  });
};
export const UpdateMyCourse = async (courseId, data) => {
  try {
    if (data.thumbnail && typeof data.thumbnail === "string") {
      await cloudinary.uploader.destroy(data?.thumbnail?.public_id);

      const myCloud = await cloudinary.uploader.upload(data.thumbnail, {
        folder: "avatars-lms",
        width: 150,
        crop: "scale",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const courseInfo = await course.findByIdAndUpdate(
      courseId,
      { $set: data },
      { returnDocument: "after" },
    );

    return {
      success: true,
      courseInfo,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const GetMySingleCourse = async (CourseId) => {
  //redis get
  const isCaching = await redis.get(CourseId);
  if (isCaching) {
    const getCourse = JSON.parse(isCaching);
    return { success: true, getCourse };
  } else {
    const getCourse = await course
      .findById(CourseId)
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links",
      );
    const caching = await redis.set(CourseId, JSON.stringify(getCourse));
    return {
      success: true,
      getCourse,
    };
  }
};
export const GetMyAllCourse = async () => {
  const caching = await redis.get("allcourses");
  if (caching) {
    const allcourses = JSON.parse(caching);
    return { success: true, getCourse: allcourses };
  } else {
    const getCourse = await course
      .find()
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links",
      );

    const setcourses = await redis.set("allcourses", JSON.stringify(getCourse));
    return {
      success: true,
      getCourse,
    };
  }
};
export const GetMyUserCourse = async (courseList, courseId) => {
  const courseExists = courseList.find(
    (course) => course._id.toString() === courseId,
  );
  if (!courseExists) {
    throw new Error("You are not allowed to access this course!");
  }
  const fullcourse = await course.findById(courseId);
  const coursedata = fullcourse.courseData;

  return { success: true, coursedata };
};
export async function AddMyQuestion(contentId, question, courseId, user) {
  //ck user have same course or not
  const isUserCourseValid = user?.Courses?.find(
    (course) => course._id === courseId,
  );

  if (!isUserCourseValid) {
    throw new Error("You have not permission to access this course content!");
  }
  const fullcourse = await course.findById(courseId);
  if (!course) {
    throw new Error("Invalid course id");
  }

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new Error("Invalid content id");
  }

  const courseContent = fullcourse.courseData.find((item) =>
    item._id.equals(contentId),
  );
  if (!courseContent) {
    throw new Error("Content not found");
  }

  const newQuestions = {
    user,
    question,
    questionReplies: [],
  };

  courseContent.questions.push(newQuestions);
  await fullcourse.save();

  return { success: true };
}
export async function AddMyReply(contentId, reply, courseId, questionId, user) {
  const fullcourse = await course.findById(courseId);
  if (!fullcourse) {
    throw new Error("Invalid course id");
  }

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new Error("Invalid content id");
  }

  const courseContent = fullcourse?.courseData?.find(
    (item) => item._id.toString() === contentId,
  );
  if (!courseContent) {
    throw new Error("courseContent not found");
  }
  const question = courseContent?.questions?.find((item) =>
    item._id.equals(questionId),
  );
  if (!question) {
    throw new Error("Question not found!");
  }
  const newAnswer = {
    user: user,
    question: reply,
  };

  if (!question.commentReplies) {
    question.commentReplies = [];
  }
  question.commentReplies.push(newAnswer);

  await fullcourse.save();
  const questionUserId = question?.user?.toString();
  const currentUserId = user?._id?.toString();

  if (questionUserId === currentUserId) {
    //own notify
  } else {
    const questionOwner = await User.findById(question.user);
    const data = {
      name: questionOwner.name,
      title: courseContent.title,
    };
    const html = await ejs.renderFile(
      path.join(__dirname, "../Utils/Reply-Mail.ejs"),
      data,
    );
    try {
      await sendMail({
        email: questionOwner.email,
        subject: "Question Reply",
        template: "Reply-Mail.ejs",
        html,
      });
      return { success: true, fullcourse };
    } catch (error) {
      console.error("Email send error:", error.message);
    }
  }
  return { success: true, fullcourse };
}
export async function AddMyReview(user, courseId, review, rating) {
  const courseList = user?.Courses;
  const isExistsCourse = courseList.some((item) => item._id === courseId);
  if (!isExistsCourse) {
    throw new Error("You are not accessable to this course!");
  }
  const fullcourse = await course?.findById(courseId);
  const reviewData = {
    user,
    rating: rating,
    comment: review,
  };
  fullcourse?.reviews?.push(reviewData)
  const reviews = fullcourse?.reviews;

if (fullcourse) {
  const totalRating = reviews?.reduce((sum, rev) => sum + (rev.rating || 0), 0) || 0;
  fullcourse.ratings = reviews?.length ? totalRating / reviews.length : 0;
}
  await fullcourse?.save()
  const notification={
    title:"New Review Receive!",
    message:`${user?.name} has given a review in ${fullcourse?.name}`
  }
  return { success: true,fullcourse};
}
export async function AddReplyMyReview(comment,courseId,reviewId,user){
const fullcourse=await course.findById(courseId)
if(!fullcourse){
  throw new Error("course not found!")
}

const FullReviewData=await fullcourse.reviews.find((rev)=>rev._id.toString()===reviewId)

if(!FullReviewData){
throw new Error("Review not found!")
}

const ReplyData={
  user:user,
  comment
}
if(!FullReviewData.commentReplies){
  FullReviewData.commentReplies=[]
}
FullReviewData?.commentReplies?.push(ReplyData)
await fullcourse?.save()
return {
  success:true,
  fullcourse
}
}
