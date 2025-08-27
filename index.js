const express = require('express')
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/courses')
const { adminRouter } = require('./routes/admin')

const app = express()
const port = 3000

app.get('/',(req,res) =>{
    res.send("Hello world")
})

app.use("/user",userRouter)
app.use("/user",adminRouter)
app.use("/courses",courseRouter)


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})