const express = require("express")

const userRouter = express.Router()




userRouter.post('/login',(req,res)=>{
    res.json({
        message : "User login window"
    })
})

userRouter.post('/signup',(req,res)=>{
    res.json({
        message : "User Signup "
    })
})

userRouter.post('/purchase',(req,res)=>{
    res.json({
        message : "Purchase a course"
    })
})


module.exports = {
    userRouter  : userRouter
}
