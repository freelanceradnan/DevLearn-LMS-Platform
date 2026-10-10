import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import course from "../Models/Course.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
export const GetAllComments = CatchAsyncError(async (req, res, next) => {
    try {
        const AllCourse = await course.find({}).lean();
        
        const AllComments = AllCourse.flatMap((courseItem) => {
            const courseId = courseItem._id;
            const courseData = courseItem?.courseData || [];

            return courseData.flatMap((contentItem) => {
                const contentId = contentItem._id;
                const questions = contentItem?.questions || [];
                return questions
                    .filter((q) => q !== null && q !== undefined)
                    .map((q) => ({
                        ...q,            
                        courseId: courseId,
                        contentId: contentId 
                    }));
            });
        });

        return res.status(200).json({
            success: true,
            message: "Success to get All Course comments",
            data: AllComments
        });
     
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get all course comments"
        });
    }
});