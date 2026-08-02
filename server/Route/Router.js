import express from "express";
import * as authController from "../App/Controller/AuthController.js";
import isAuthenticated from "../App/Middleware/AuthenticateMiddleware.js";
import * as userController from "../App/Controller/UserController.js";
import * as CourseController from "../App/Controller/CourseController.js";
import * as OrderController from "../App/Controller/OrderController.js";
import * as NotificationController from "../App/Controller/NotificationController.js";
import { AdminMiddlewares } from "../App/Middleware/AdminMiddleware.js";


const router = express();

router.get("/", function (req, res) {
  res.send("this router is on!");
});
//auth related router
router.post("/register", authController.Registration);
router.post("/activation", authController.ActiveUser);
router.post("/login", authController.UserLogin);
router.post("/logout", isAuthenticated,AdminMiddlewares, authController.LogoutUser);
router.get("/refreshtoken", authController.updateToken);
router.get("/getUserInfo", isAuthenticated, userController.getInfo);
router.post("/social-auth", authController.socialAuth);
router.put("/update-info", isAuthenticated,userController.updateUserInfo);
router.patch("/change-password", isAuthenticated,userController.updatePassword);
router.put("/update-avatar", isAuthenticated,userController.UpdateUserAvatar);
//course related router
router.post('/create-course',isAuthenticated,AdminMiddlewares,CourseController.CreateCourse)
router.post('/update-course/:id',isAuthenticated,AdminMiddlewares,CourseController.UpdateCourse)
router.get('/course/:id',CourseController.GetSingleCourse)
router.get('/courses',CourseController.GetAllCourse)
router.get('/myCourse/:id',isAuthenticated,CourseController.GetUserCourse)
router.post('/add-questions',isAuthenticated,CourseController.AddQuestions)
router.post('/add-replies',isAuthenticated,CourseController.AddReplies)
router.post('/add-review/:id',isAuthenticated,CourseController.AddReviews)
router.post('/add-review-reply',isAuthenticated,AdminMiddlewares,CourseController.AddReplyToReview)
router.post('/create-order',isAuthenticated,OrderController.CreateOrder)
router.get('/all-notifications',isAuthenticated,AdminMiddlewares,NotificationController.getNotifications)
router.put('/update-notification/:id',isAuthenticated,AdminMiddlewares,NotificationController.updateNotifications)
router.get('/getAlluser',isAuthenticated,AdminMiddlewares,userController.GetAllUsers)
router.get('/all-course',isAuthenticated,AdminMiddlewares,CourseController.GetAllCourse)
router.put('/update-user',isAuthenticated,AdminMiddlewares,userController.UpdateUserRole)
router.delete('/DeleteUser/:id',isAuthenticated,AdminMiddlewares,userController.DeleteUser)
export default router;
