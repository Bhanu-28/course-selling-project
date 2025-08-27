const express = require('express')
require("dotenv").config()
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/courses')
const { adminRouter } = require('./routes/admin')
const mongoose = require("mongoose")

const app = express()
const port = 3000

app.get('/',(req,res) =>{
    res.send("Hello world")
})

app.use("/user",userRouter)
app.use("/user",adminRouter)
app.use("/courses",courseRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_DB_URL)
    app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})
}

main()