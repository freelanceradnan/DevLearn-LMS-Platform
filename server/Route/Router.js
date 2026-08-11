import express from "express";
import * as authController from "../App/Controller/AuthController.js";
import isAuthenticated from "../App/Middleware/AuthenticateMiddleware.js";
import * as userController from "../App/Controller/UserController.js";
import * as CourseController from "../App/Controller/CourseController.js";
import * as OrderController from "../App/Controller/OrderController.js";
import * as NotificationController from "../App/Controller/NotificationController.js";
import * as AnalysisController from '../App/Controller/AnalysisController.js'
import * as LayoutController from '../App/Controller/LayoutController.js'
import { AdminMiddlewares } from "../App/Middleware/AdminMiddleware.js";


const router = express();

router.get("/", function (req, res) {
  res.send("this router is on!");
});
//auth related router
router.post("/register", authController.Registration);
router.post("/activation", authController.ActiveUser);
router.post("/login", authController.UserLogin);
router.post("/logout", isAuthenticated, authController.LogoutUser);
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
router.delete('/DeleteCourse/:id',isAuthenticated,AdminMiddlewares,CourseController.DeleteCourse)
router.get('/users-analytics',isAuthenticated,AdminMiddlewares,AnalysisController.getUsersAnalytics)
router.get('/courses-analytics',isAuthenticated,AdminMiddlewares,AnalysisController.getCourseAnalytics)
router.get('/orders-analytics',isAuthenticated,AdminMiddlewares,AnalysisController.getOrdersAnalytics)
router.post('/create-layout',isAuthenticated,AdminMiddlewares,LayoutController.CreateLayout)
router.put('/edit-layout',isAuthenticated,AdminMiddlewares,LayoutController.editLayout)
router.get('/layout',isAuthenticated,AdminMiddlewares,LayoutController.GetLayoutByType)
export default router;
