import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// creating a schema

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Enter your name"]
    },

    email:{
        type:String,
        required:[true, "Enter your email"],
        validate:[validator.isEmail, "PLease enter correct email address"],
    },

    phone:{
        type:Number,
        required:[true, "Enter your phone number"]
    }, 

    password:{
        type:String,
        required:[true, "enter your password"],
        minLength:[8, "Password must contain atleast 8 characters"]
    },

    role:{
        type:String,
        required:[true, "Please provide your role"],
        enum:["Job Seeker", "Employer"]                  // enum: can have only these values not other than these
    }, 

    createdat:{
        type:Date,
        default:Date.now
    }

})


// Hashing the password

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
    next();
    }
    this.password=await bcrypt.hash(this.password, 10)
})

//Comparing data 

userSchema.methods.comparePassword=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password)
}

// Generating a JWT for authorisation

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRE
    })
}


// creating a model

export const User=mongoose.model("User", userSchema)