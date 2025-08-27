
const{Router} = require("express")
const {adminModel} = require("../db")

const adminRouter = Router()


adminRouter.post('/login',(req,res)=>{
    res.json({
        message : "Admin login window"
    })
})

adminRouter.post('/signup',(req,res)=>{
    res.json({
        message : "Admin Signup "
    })
})


adminRouter.post('/create/course',(req,res)=>{
    res.json({
        message : "Create a course"
    })
})

adminRouter.put('/update/{courseId}',(req,res)=>{
    res.json({
        message : "update a course"
    })
})


module.exports = {
    adminRouter : adminRouter
}
