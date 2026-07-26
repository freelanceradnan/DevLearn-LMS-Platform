import express from "express";
import *as authController from '../App/Controller/AuthController.js'
const router=express()

router.get('/',function(req,res){
    res.send('this router is on!')
})
router.post('/register',authController.Registration)
router.post('/activation',authController.ActiveUser)

export default router