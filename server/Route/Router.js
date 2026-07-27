import express from "express";
import *as authController from '../App/Controller/AuthController.js'
import isAuthenticated from "../App/Middleware/AuthenticateMiddleware.js";

const router=express()

router.get('/',function(req,res){
    res.send('this router is on!')
})
router.post('/register',authController.Registration)
router.post('/activation',authController.ActiveUser)
router.post('/login',authController.UserLogin)
router.post('/logout',isAuthenticated,authController.LogoutUser)
router.get('/updateToken',authController.updateToken)
export default router