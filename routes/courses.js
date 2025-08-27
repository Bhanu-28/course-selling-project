const{Router} = require("express")


const courseRouter = Router()


courseRouter.get('/all',(req,res)=>{
    res.json({
        message : "get all the courses"
    })
})

courseRouter.get('/purchased',(req,res)=>{
    res.json({
        message : "see my courses"
    })
})


module.exports = {
    courseRouter  : courseRouter
}
