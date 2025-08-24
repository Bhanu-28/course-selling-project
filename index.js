const express = require('express')

const app = express()
const port = 3000

app.get('/',(req,res) =>{
    res.send("Hello world")
})


app.post('/users/login',(req,res)=>{
    res.json({
        message : "User login window"
    })
})

app.post('/users/signup',(req,res)=>{
    res.json({
        message : "User Signup "
    })
})

app.post('/user/purchase',(req,res)=>{
    res.json({
        message : "Purchase a course"
    })
})

app.get('/courses',(req,res)=>{
    res.json({
        message : "get all the courses"
    })
})

app.get('/user/myCourses',(req,res)=>{
    res.json({
        message : "see my courses"
    })
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})