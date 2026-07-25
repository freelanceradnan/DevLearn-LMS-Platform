import express from "express";

const router=express()

router.get('/',function(req,res){
    res.send('this router is on!')
})
export default router