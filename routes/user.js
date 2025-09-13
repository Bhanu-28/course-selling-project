const express = require("express")

const userRouter = express.Router()


// Import the dependencies

const bcrypt = require("bcrypt")
const zod = require("zod")
const { userModel } = require("../db")
const {JWT_USER_PASSWORD} = require("../config")
const jwt  = require("jsonwebtoken")



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

userRouter.post('/login',async function(req,res) {
    
    const requireBody = zod.object({
        email : zod.email(),
        password : zod.string().min(5).max(100)
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    
     // Now checking and warning whether the user/admin has given some invalid input or not

    if (!parseDataWithSuccess.success) {
        res.status(400).json({
            msg: "Invalid Input Given",
            errors: parseDataWithSuccess.error.issues
        })
        return
    }


    const{email,password} = req.body;

    const user = await userModel.findOne({
        email : email
    })


    if(!user){
        res.status(401).json({
            msg : `User Doesn't exists with this email : ${email}`

    })
        return
    }

    const decryptedPassword = await bcrypt.compare(password,user.password);

    if(!decryptedPassword){
        res.status(403).json({
            msg : "User Not Found Invalid Credentials!!"
        }) 
    }else{
        const token = jwt.sign({
            id : user._id
        },JWT_USER_PASSWORD)


        //some logic related to cookie here...

        res.json({
            msg : `${user.firstName} Succesfully Logged in!!`,
            token : token
        })
    }
})


userRouter.post('/purchase',(req,res)=>{
    res.json({
        message : "Purchase a course"
    })
})


module.exports = {
    userRouter  : userRouter
}
