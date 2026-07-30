import express from "express";
import * as authController from "../App/Controller/AuthController.js";
import isAuthenticated from "../App/Middleware/AuthenticateMiddleware.js";
import * as userController from "../App/Controller/UserController.js";
import * as CourseController from "../App/Controller/CourseController.js";
import { AdminMiddlewares } from "../App/Middleware/AdminMiddleware.js";


const router = express();

router.get("/", function (req, res) {
  res.send("this router is on!");
});
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

router.post('/create-course',isAuthenticated,AdminMiddlewares,CourseController.CreateCourse)
router.post('/update-course/:id',isAuthenticated,AdminMiddlewares,CourseController.UpdateCourse)
router.get('/course/:id',CourseController.GetSingleCourse)
router.get('/courses',CourseController.GetAllCourse)
router.get('/myCourse/:id',isAuthenticated,CourseController.GetUserCourse)
router.post('/add-questions',isAuthenticated,CourseController.AddQuestions)
router.post('/add-replies',isAuthenticated,CourseController.AddReplies)
export default router;
