import express from "express";
import *as authController from '../App/Controller/AuthController.js'
import isAuthenticated from "../App/Middleware/AuthenticateMiddleware.js";
import *as userController from '../App/Controller/UserController.js'

const router=express()

router.get('/',function(req,res){
    res.send('this router is on!')
})
router.post('/register',authController.Registration)
router.post('/activation',authController.ActiveUser)
router.post('/login',authController.UserLogin)
router.post('/logout',isAuthenticated,authController.LogoutUser)
router.get('/refreshtoken',authController.updateToken)
router.get('/getUserInfo',isAuthenticated,userController.getInfo)
router.post('/social-auth',authController.socialAuth)
export default router