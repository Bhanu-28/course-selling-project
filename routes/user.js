const express = require("express")

const userRouter = express.Router()


// Import the dependencies

const bcrypt = require("bcrypt")
const zod = require("zod")
const { userModel } = require("../db")



userRouter.post('/signup',async function(req,res) {


    // Input validation.
    const requiredBody = zod.object({

        email : zod.email(),
        password : zod.string().min(5).max(100),
        firstName : zod.string().min(3).max(20),
        lastName : zod.string().min(3).max(20)
    }

)

    // Parse the request body.
    const parseDataWithSuccess = requiredBody.safeParse(req.body);

    // Now checking and warning whether the user/admin has given some invalid input or not

    if(!parseDataWithSuccess.success){
        res.status(400).json({
            msg : "Invalid Input Given",
            error: parseDataWithSuccess.error.issues
        })
        return
    }

    const {email, password, firstName, lastName} = req.body;

    // Hashing the password so plain password is not stored in the database.

    //error handle with try catch.


    let errorFound = false;


    try{
        const hashedPassword  = await bcrypt.hash(password,10);

        await userModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        })
    }catch(e){
        res.status(400).json({
            msg : "Email entered Already Exists in the Database!"
        })

        errorFound = true;
    }

    if(!errorFound){
        res.json({
            msg: `${firstName} Successfully SignedUP to the database, as USER!`
        })
    }

})

userRouter.post('/login',(req,res)=>{
    res.json({
        message : "User login window"
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
